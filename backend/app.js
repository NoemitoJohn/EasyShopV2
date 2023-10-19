require('dotenv').config()
const express = require('express')
const mysql = require('mysql')
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')


//Impoert Controllers
const productsController = require('./controller/productController')
const usersController = require('./controller/userController')


const app = express()


app.use(cors({
    //this is the only line you will change the domain name
//  origin: ["https://www.ecshopping.online"],
//  methods: ["POST", "GET"],
 credentials: true    
 }
 ))

 
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');


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
        // host     : 'sql12.freesqldatabase.com',
        // user     : 'sql12653918',
        // password : 'e8EnMbdWJ3',
        // database : 'sql12653918',
        host     : 'localhost',
        user     : 'root',
        password : '',
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

app.get('/' , (req, res) => {
    "HELLO"
 
});

app.post('/login', usersController.login)
app.post('/signup', usersController.signup)
app.get('/products', productsController.getAllProducts)
app.get('/product/:id', productsController.getProduct)
app.get('/cart')




app.listen(3000, ()=>{
    console.log(`Listening at PORT 3000`)
})







