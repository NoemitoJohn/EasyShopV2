const stripe = require('stripe')(process.env.STRIPE_KEY);
const DB = require('../models/DB')


const mapListItem = (array) =>{
    
    return array.map((item) =>{
        
        
        const thumbnail = JSON.parse(item.product.products_info.img_url)
        
        console.log(thumbnail[0])
        
        return {
            price_data: {
                currency : 'php',
                product_data: {
                    name : item.product.name, 
                    images : [thumbnail[0]],
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
        const images = JSON.parse(item.product.products_info.img_url)
        const thumbnail = images[0]
        const productObject = {
            product : {
                id : item.product.id,
                name : item.product.name,
                quantity : item.quantity,
                price : item.product.price,
                thumbnail : thumbnail,
                
            }
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


const testCheckout = async (req, res) =>{
    if(!req.user){
        return res.json({status: 400, message: `Please Login`})
    }
    
    // return console.log(JSON.parse(`[{"cart_id":1},{"cart_id":2},{"cart_id":3},{"cart_id":4}]`))
    
    const carts = await DB.Cart.findAll({
        attributes : [ 'id', 'quantity'], 
        
        where : {
            user_id : req.user.id
        },
        
        include : [
            {
                model : DB.Product, 
                require : true, 
                attributes : ['id', 'name', 'price'],
                include: [{
                    model : DB.ProductInfo,
                    require: true,
                    attributes: ['img_url']
                }]
            },
        ]})
        
        
        
        const product_items = []
        for (const item of carts) {
            // const t = await DB.instance.transaction()
            const images = JSON.parse(item.product.products_info.img_url)
            const thumbnail = images[0]
            const productObject = {
                product : {
                    id : item.product.id,
                    name : item.product.name,
                    quantity : item.quantity,
                    price : item.product.price,
                    thumbnail : thumbnail,
                    
                }
            }
            product_items.push(productObject)
            
        }
        const productsStr = JSON.stringify(product_items)
        const productParse = JSON.parse(productsStr)
        
        console.log(productsStr)
        const order = await DB.Order.create({
            product_item : productParse,
            total : 100,
            transaction_id : 1020,
            user_id : 1
        })
        res.json(order)
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
                    require : true, 
                    attributes : ['id', 'name', 'price'],
                    include: [{
                        model : DB.ProductInfo,
                        require: true,
                        attributes: ['img_url']
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
            
            success_url: 'http://localhost:5173',
            cancel_url: 'https://example.com',
            
        })
        res.send(strpSession.url)
            
    } catch (error) {
        throw error
    }
            
            
}
        
const webhook = async (req, res) => {
    const endpointSecret = "whsec_6afb0d281c9bad3ec7ab1267a13b333576d2db499e638e0e8adc7225e21ab6cd";
    
    const sig = req.headers['stripe-signature'];
    // console.log('Weeeeeeeebhoook')
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        console.log(err.message)
        return;
    }
    
    // console.log('event.type', event.type)
    // Handle the event
    if (event.type == 'checkout.session.completed' ) {
        
        
        const checkoutCompleted = event.data.object;
        
        if(checkoutCompleted.payment_status !== 'paid') return res.send('')
        
        
        const data = checkoutCompleted.metadata
        console.log(checkoutCompleted)
        // return res.json(checkoutCompleted)
        const cart = await DB.Cart.findAll({
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
                        attributes: ['img_url']
                    }]
                },
            ] 
        })
        
        const order = await createOrder(cart, checkoutCompleted.amount_total, checkoutCompleted.id, data.user_id)
        
        if(order){
            console.log('Success!')
        }
        
        //        4242 4242 4242 4242
        
    }
    
    // Return a 200 response to acknowledge receipt of the event
    // res.send();      
}
        
        
        
        module.exports = {checkout , webhook, testCheckout}