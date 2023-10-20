const stripe = require('stripe')(process.env.STRIPE_KEY);
const DB = require('../models/DB')

const mapProductListing = (array) =>{
    array.map((item) =>{
            
        const imgJSON = JSON.parse(item.product.products_info.img_url)
        //TODO parse image url
        
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
    
    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }
    
    
    try {
        
        const cart = await DB.Cart.findAll({
            attributes : [ ['id', 'cart_id'], 'quantity'], 
            where : {
                user_id : req.session.user.id
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
        
        const strpSession = await stripe.checkout.sessions.create({
        
            mode: 'payment',
        
            line_items : mapProductListing(cart),
            
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