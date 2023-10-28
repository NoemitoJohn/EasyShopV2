const express = require('express')
const {isAdminAuth} =require('../middleware/isAuth')
const {logIn, signUp, getOrders, getOrder, upateOrder} = require('../controller/adminController')
const {addProduct, updateProduct, updateCategory, addCategory, updateStocks} = require('../controller/productController')
const {upload} = require('../middleware/uploader')
const router = express.Router()
//TODO: add admin auth middleware

router.post('/', logIn)

router.get('/orders', getOrders)
router.get('/order/:id', getOrder)

router.post('/signup', signUp)

router.post('/product', [ isAdminAuth, upload.array('my_file', 4)], addProduct)
router.patch('/product', isAdminAuth , updateProduct) //

router.patch('/category',isAdminAuth, updateCategory) //
router.post('/category',isAdminAuth, addCategory) // 
router.post('/stocks',isAdminAuth, updateStocks) //

router.patch('/order/',isAdminAuth, upateOrder)





module.exports = {adminRouter : router}