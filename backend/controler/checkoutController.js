const stripe = require('stripe')(process.env.STRIPE_KEY);
const DB = require('../models/DB')

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
                    attributes : ['id', 'name', 'price']
                }

            ] 
        })
        
    
        res.send(cart)
        
    } catch (error) {
        throw error
    }

    // const strpSession = await stripe.checkout.sessions.create({
        
    //     mode: 'payment',
        
    //     line_items : [{
           
    //         price_data: {
    //             currency : 'php',
    //             product_data: {
    //                 name : 'Item 1'
    //             },
    //             unit_amount: 500
    //         },
    //         quantity: 5,
    //     },
    //     {
           
    //         price_data: {
    //             currency : 'php',
    //             product_data: {
    //                 name : 'Item 2'
    //             },
    //             unit_amount: 500
    //         },
    //         quantity: 10,
    //     }
    // ],
        
    //     success_url: 'http://127.0.0.1:3000/webhook',
    //     cancel_url: 'https://example.com',
    // })
    // res.send(strpSession.url)

}


const webhook = (req, res) =>{


}

module.exports = {checkout , webhook}