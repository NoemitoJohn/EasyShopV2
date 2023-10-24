const express = require('express')
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const {postCart, getCart, deleteCart, updateCart} = require('../controller/cartController')
const isAuth = require('../middleware/isAuth')


router.use(isAuth)

router.post('/checkout', async (req, res) =>{
    
    // /console.log(req.body)
    // 100 = 1 peso

    const strpSession = await stripe.checkout.sessions.create({
        
        mode: 'payment',
        
        line_items : [{
           
            price_data: {
                currency : 'php',
                product_data: {
                    name : 'Item 1'
                },
                unit_amount: 500
            },
            quantity: 5,
        },
        {
           
            price_data: {
                currency : 'php',
                product_data: {
                    name : 'Item 2'
                },
                unit_amount: 500
            },
            quantity: 10,
        }
    ],
        
        success_url: 'http://127.0.0.1:3000/webhook',
        cancel_url: 'https://example.com',
    })
    console.log(strpSession)
    res.redirect(strpSession.url)

    // if(!req.session.user){
    //     res.redirect('/login')
    // }
    // console.log(req.session.cart)
    
    // const productId = req.session.cart.id
    // const productQty = req.session.cart.qty

    

    // if(!Array.isArray(productId)){
        
    //     axios.get(`https://dummyjson.com/products/${productId}`).then(result => {
    //         console.log(result.data)
    //         const price = result.data.price
    //         const total = price * Number(productQty)
    //         //save total to session
    //         const product = {
    //             qty : productQty,
    //             title : result.data.title,
    //             total : total
    //         }

    //         const totals = {
    //             order : total,
    //             shipping : SHIPPING,
    //             totalAmount : total + SHIPPING
    //         }

    //         res.render('checkout', {categories : req.app.get('categories'), userEmail: req.app.get('userEmail'), products : product, totals : totals })

    //     })
    
    // }else{
       
    //     const endpoint = []
        
    //     productId.forEach((item, index) =>{
    //        endpoint[index] = axios.get(`https://dummyjson.com/products/${item}`)
    //     })
        
    //     Promise.all(endpoint).then((result) =>{
            
    //         const products =[]
            
    //         let total = 0

    //         result.forEach((product, index) =>{
                
    //             const price = product.data.price
                
    //             const qty = Number(productQty[index])
                
    //             amount = price * qty

    //             total += amount 
                
    //             products[index] = {
    //                 qty : qty,
    //                 title : product.data.title,
    //                 total : amount
    //             }
    //         })

    //         let totalObj = {
    //             order : total,
    //             shipping : 150,
    //             totalAmount : total + SHIPPING
    //         }

    //         res.render('checkout', {categories : req.app.get('categories'), userEmail: req.app.get('userEmail'), products : products, totals : totalObj})
    //     })
    // }
})

router.get('/', getCart)
router.post('/', postCart)
router.delete('/', deleteCart)
router.patch('/', updateCart)

module.exports = { cartRouter : router}


