require('dotenv').config()
const express = require('express')
const mysql = require('mysql');
const expressLayouts = require('express-ejs-layouts');
const axios = require('axios')
const Promise = require('promise');
const path = require('path');
const AccountSettingsRoute = require('./routes/updateAccount')
const categoryRoute = require('./routes/category')
const signUpRoute = require('./routes/signup')
const {userRouter} = require('./routes/users')
const {productRouter , productsDataArrayToObject} = require('./routes/product')
const {cartRouter } = require('./routes/cart')
const searchRouter = require('./routes/search')

const bodyParser = require('body-parser')
const app = express();
const session = require('express-session');
const cors = require('cors')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const adapter = new FileAsync('db.json')

app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);

app.use(cors({
    // credentials : true,
    // allowedHeaders: ['Content-Type', 'Authorization']
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
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'easyshopv2',
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

app.get('/' , (req, res) => {

    // connection.query('SELECT * FROM product', function (error, results, fields) {
    //     // error will be an Error if one occurred during the query
    //     // results will contain the results of the query
    //     // fields will contain information about the returned results fields (if any)
    //     if(Array.isArray(results)){
    //         console.log(results)
    //     }
    //     res.send().end()
    //   });
    
    Promise.all([
     axios.get('https://dummyjson.com/products?limit=0'),
     axios.get('https://dummyjson.com/products/categories')])

        .then(function(result){    
            
            const productsResult = result[0].data;
            const categoriesResult = result[1].data

            app.set('categories', categoriesResult)
            app.set('products', productsResult)
            
            const featured = []

            for (const product of productsResult.products) {
            
                if(product.rating > 4.8){
                    featured.push(product)
                }
            }
            
            const userEmail = req.session.userEmail
            app.set('userEmail', userEmail)
            const fetureProducts =  productsDataArrayToObject(featured);
            
            
            const cartCount = cartRouter.getCartCount(req.app, req.session.user)

            

            
            res.render('index', {products: fetureProducts, categories : categoriesResult , userEmail: userEmail, cartItems: cartCount});
        })
 
});
    
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

app.get('/about', (req, res)=>{
    res.send("About")
})

app.use('/api/products', productRouter)
app.use('/category', categoryRoute.router)
app.use('/search', searchRouter.router)
app.use('/api/user', userRouter )
app.use('/signup', signUpRoute.router)
app.use('/api/cart', cartRouter)
app.use('/Account_Settings', AccountSettingsRoute.router)

app.post('/logout', (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/')
    })
})



low(adapter).then(function (db) {
    
}).then(function (){
    app.listen(3000, () => {
        console.log(`Example app listening on port http://127.0.0.1:3000/`)
    })
})


