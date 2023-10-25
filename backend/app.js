require('dotenv').config()
const {sendValidationEmail} = require('./service/EmailProvider')
const express = require('express')
const DB = require('./models/DB')
const {userRouter} = require('./routes/users')
const {productRouter} = require('./routes/product')
const {cartRouter } = require('./routes/cart')
const {checkoutRouter } = require('./routes/checkout')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express();
const session = require('express-session');
const cors = require('cors')


app.use(cors({
<<<<<<< HEAD
    //this is the only line you will change the domain name
    origin: "http://localhost:5173",
    methods: ['POST', 'PATCH', 'GET', 'DELETE'],
=======

    origin: "http://localhost:5173",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
>>>>>>> 152094a6925bfefeee58fd0d23445f62b060af6e
    credentials: true,
    optionsSuccessStatus: 200,
}
))
<<<<<<< HEAD
=======
// app.use(cookieParser())
// http://localhost:5173/products
>>>>>>> 152094a6925bfefeee58fd0d23445f62b060af6e

app.use(express.static('public'))
app.use('/api/product/static', express.static('product_img'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/checkout',checkoutRouter)

app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie : {
        expires : 60 * 60 * 24,
    }
}))

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
app.use('/api/user', userRouter )
app.use('/api/cart', cartRouter)


app.post('/logout', (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/')
    })
})

const startServer = async () =>{
    
    app.listen(3000, () => {console.log(`Example app listening on port http://127.0.0.1:3000/`)})
}

startServer()
    
    
    
    