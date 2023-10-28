const stripe = require('stripe')(process.env.STRIPE_KEY);
const DB = require('../models/DB')


const mapListItem = (array) =>{
    
    return array.map((item) =>{
        
        
        // const thumbnail = JSON.parse(item.product.products_info.img_url)
        
        return {
            price_data: {
                currency : 'php',
                product_data: {
                    name : item.product.name, 
                    images : [item.product.products_info.img_url],
                },
                unit_amount: item.product.price * 100
            },
            quantity: item.quantity,
        }
    })
}

const createOrder = async (_cart, _total, _transaction_id, _user_id) =>{
    const product_items = []
    const t = await DB.instance.transaction()
    
    for (const item of _cart) {
        
        const productObject = {
            product : {
                id : item.product.id,
                name : item.product.name,
                quantity : item.quantity,
                price : item.product.price,
                thumbnail : item.product.products_info.img_url,
                
            }
        }
        const product = await DB.Product.findOne({
            where : {
                id : item.product.id
            },
            attributes : [],
            include : [
                {
                    model : DB.Inventory,
                    required : true,
                    // attributes : ['id']
                }
            ]
        })

        const updateInventory = await DB.Inventory.update({out : (product.inventory.out + item.quantity)}, {
            where: {
                id : product.inventory.id,
            } ,
            transaction : t
        })

        if(updateInventory == 1){
            console.log('Update')
        }

        product_items.push(productObject)
        
        try {
            await DB.Cart.destroy({
                where : {
                    id : item.id
                }
            }, {transaction : t})
            
        } catch (error) {
            if(error) t.rollback()
            console.log(error)
            return false
        }
        
    }
    
    try {
        const productsStr = JSON.stringify(product_items)
        const productParse = JSON.parse(productsStr)
        const order = await DB.Order.create({
            product_item : productParse,
            total : _total,
            transaction_id : _transaction_id,
            user_id : _user_id
        }, {transaction : t})
        if(order){
            t.commit()
            return true
        }
        
    } catch (error) {
        if(error) t.rollback()
        return false
    }
}
    
    
const checkout = async (req, res) => {
        
    if(!req.user){
        return res.json({status: 400, message: `Please Login`})
    }
    
    try {
        
        const cart = await DB.Cart.findAll({
            attributes : [ 'id', 'quantity'], 
            where : {
                user_id : req.user.id
            },
            include : [
                {
                    model : DB.Product, 
                    attributes : ['id', 'name', 'price'],
                    include: [{
                        model : DB.ProductInfo,
                        required : true,
                        attributes: [[DB.instance.fn('JSON_EXTRACT', DB.instance.col('img_url'), DB.instance.literal('"$[0]"')), 'img_url'],]
                    }]
                },
            ] 
        })
        
        
        
         
        if(cart.length <= 0) return
        
        const strpSession = await stripe.checkout.sessions.create({
            
            mode: 'payment',
            metadata : {
                user_id : req.user.id, 
                cart_item : JSON.stringify(
                    cart.map((item)=>{
                        return {
                            id : item.id
                        }
                    }))
                },
                
            line_items : mapListItem(cart),
            
            success_url: process.env.CLIENT_URL2,
            cancel_url: 'https://example.com',
            
        })
        res.send(strpSession.url)
            
    } catch (error) {
        console.log(error)
    }
            
            
}
        
const webhook = async (req, res) => {
    const endpointSecret = process.env.STRIPE_KEY_SECRET;
    
    const sig = req.headers['stripe-signature'];
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        console.log(err.message)
        return;
    }
    
    if (event.type == 'checkout.session.completed' ) {
        
        
        const checkoutCompleted = event.data.object;
        
        if(checkoutCompleted.payment_status !== 'paid') return 
        
        
        const data = checkoutCompleted.metadata
        console.log(data)
        let cart;
        
        try {
            
            cart = await DB.Cart.findAll({
                attributes : [ 'id', 'quantity'], 
                where : {
                    user_id : data.user_id
                },
                include : [
                    {
                        model : DB.Product, 
                        require : true, 
                        attributes : ['id', 'name', 'price'],
                        include: [{
                            model : DB.ProductInfo,
                            require: true,
                            attributes: [[DB.instance.fn('JSON_EXTRACT', DB.instance.col('img_url'), DB.instance.literal('"$[0]"')), 'img_url']]
                        }]
                    },
                ] 
            })

        } catch (error) {
            if(error)
                console.error(error)
        }
        

        
        try {
            
            const order = await createOrder(cart, checkoutCompleted.amount_total, checkoutCompleted.id, data.user_id)
        } catch (error) {
            console.log('ERR:ORDER:CREATE')
        }
        
        if(order){
           
        }
        
        //        4242 4242 4242 4242
        
    }
    
    // Return a 200 response to acknowledge receipt of the event
    // res.send();      
}
        
        
        
        module.exports = {checkout , webhook,}