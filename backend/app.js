require('dotenv').config()
const {sendValidationEmail} = require('./service/EmailProvider')
const express = require('express')
const DB = require('./models/DB')
const AccountSettingsRoute = require('./routes/updateAccount')
const adminRoutes = require('./routes/admin');
const categoryRoute = require('./routes/category')
const signUpRoute = require('./routes/signup')
const {userRouter} = require('./routes/users')
const {productRouter} = require('./routes/product')
const {cartRouter } = require('./routes/cart')
const searchRouter = require('./routes/search')

const bodyParser = require('body-parser')
const app = express();
const session = require('express-session');
const cors = require('cors')

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

DB.User.hasOne(DB.Verified, {
    foreignKey: 'user_id'
})



// const send = async () =>{
//     try{
//         const emailInfo = await sendValidationEmail('mercysweetsuarin@gmail.com')
//         console.log(emailInfo)

//     } catch(err){
//         throw err
//     }

// }


// send()
// DB.Verified.belongsTo(DB.User)


// DB.User.sync({force : true})
// DB.Verified.sync({force : true})

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

app.use('/admin', adminRoutes.adminRouter);
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


app.listen(3000, () => {
    console.log(`Example app listening on port http://127.0.0.1:3000/`)})
    
    
    
    
    