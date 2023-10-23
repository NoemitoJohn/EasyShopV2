const stripe = require('stripe')(process.env.STRIPE_KEY);
const DB = require('../models/DB')

const mapProductListing = (array) =>{
    array.map((item) =>{
        console.log(item)

        
        return {
            price_data: {
                currency : 'php',
                product_data: {
                    name : item.product.name, 
                    images : ['https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                    metadata : {
                        product_id : item.product.id
                    }
                },
                unit_amount: item.product.price * 100
            },
            quantity: item.quantity,
        }
    })
}


const checkout = async (req, res) => {
    
    if(!req.user){
        return res.json({status: 400, message: `Please Login`})
    }
    // console.log(mapProductListing(req.body.carts))
    
    try {
        
        const cart = await DB.Cart.findAll({
            attributes : [ ['id', 'cart_id'], 'quantity'], 
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
            
            line_items : cart.map((item) =>{
                
                // console.log(JSON.stringify(item, null,2 ))
                const thumbnail = JSON.parse(item.product.products_info.img_url)
                
                console.log(thumbnail[0])

                return {
                    price_data: {
                        currency : 'php',
                        product_data: {
                            name : item.product.name, 
                            images : [thumbnail[0]],
                            metadata : {
                                product_id : item.product.id
                            }
                        },
                        unit_amount: item.product.price * 100
                    },
                    quantity: item.quantity,
                }
            }),
            
            success_url: 'http://127.0.0.1:3000/webhook',
            cancel_url: 'https://example.com',
            
        })
        
       res.send(strpSession.url)
        
    } catch (error) {
        throw error
    }
    
    
}


const webhook = (req, res) =>{
    
    
}

module.exports = {checkout , webhook}