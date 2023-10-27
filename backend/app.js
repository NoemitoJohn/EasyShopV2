require('dotenv').config()
const {sendValidationEmail} = require('./service/EmailProvider')
const express = require('express')
const DB = require('./models/DB')
const {userRouter} = require('./routes/users')
const {productRouter} = require('./routes/product')
const {cartRouter } = require('./routes/cart')
const {checkoutRouter } = require('./routes/checkout')
const {adminRouter} = require('./routes/admin')
const bodyParser = require('body-parser')
const app = express();
const session = require('express-session');
const cors = require('cors')

app.use(cors({
    //this is the only line you will change the domain name
    origin: [process.env.CLIENT_URL1, process.env.CLIENT_URL2],
    methods: ['POST', 'PATCH', 'GET', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200,
}
))


app.use(express.static('public'))
app.use('/api/product/static', express.static('product_img'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/checkout',checkoutRouter)

app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
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
app.use('/api/admin', adminRouter)

app.post('/logout', (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/')
    })
})

const startServer = async () =>{
    
    app.listen(3000, () => {console.log(`Example app listening on port http://127.0.0.1:3000/`)})
}

startServer()
    
    
    
    