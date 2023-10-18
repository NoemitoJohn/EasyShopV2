require('dotenv').config()
const express = require('express')
const mysql = require('mysql');
const expressLayouts = require('express-ejs-layouts');
const axios = require('axios')
const Promise = require('promise');
const path = require('path');
const productController = require ('./controler/productControler')
// routes

const bodyParser = require('body-parser')
const app = express();
const session = require('express-session');
const cors = require('cors')
app.set('layout', 'layouts/layout');

app.use(expressLayouts);

app.use(cors({
   //this is the only line you will change the domain name
origin: ["https://www.ecshopping.online"],
methods: ["POST", "GET"],
credentials: true    
}
))

app.use(express.static('public'))
app.use('/api/product/static', express.static('product_img'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))



const dbConnection = (req, res, next) =>{
    
    const connection = mysql.createConnection({
        host     : 'sql12.freesqldatabase.com',
        user     : 'sql12653918',
        password : 'e8EnMbdWJ3',
        database : 'sql12653918',
    });
    
    connection.connect((err) => {
        if (err) {
            console.log('Cant connect to database')
            res.json({error : err.message})
            return
        }
        
        console.log('MySql Connected!') 
        req.app.set('DB', connection)
        next()
    });
    
}


app.use(dbConnection)





// const endpointSecret = "whsec_6afb0d281c9bad3ec7ab1267a13b333576d2db499e638e0e8adc7225e21ab6cd";

// app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req , res)=>{
    
//     const sig = req.headers['stripe-signature'];
//     console.log('recieve something')
//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//     } catch (err) {
//         res.status(400).send(`Webhook Error: ${err.message}`);
//         return;
//     }

//     // Handle the event
//     switch (event.type) {
//         case 'payment_intent.succeeded':
//         const paymentIntentSucceeded = event.data.object;
//         // Then define and call a function to handle the event payment_intent.succeeded
//         break;
//         // ... handle other event types
//         default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     res.send().end();
// })
app.get('/',(req, res)=>{
    res.json("Hello");
});
app.get('/products' , productController.getProducts);
    
app.get('/shipping', (req, res) => {
    
    if(!req.session.user){
        res.redirect('/login')
        return
    }

    categoriesResult = app.get('categories')
    userEmail = app.get('userEmail')
    req.session.cart = req.query

    res.render('shippinginfo', {categories : categoriesResult , userEmail: userEmail});
});



    app.listen(3000, () => {
        console.log(`Example app listening on port http://127.0.0.1:3000/`)
    })


