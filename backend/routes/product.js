const express = require('express')
const router = express.Router();
const {
    getProducts,
    getProduct,
    getProductByCategory,
    getCategories
} = require('../controller/productController')


router.get('/', getProducts)
router.get('/category/:name', getProductByCategory)
router.get('/categories', getCategories)
router.get('/:id', getProduct)



module.exports = { productRouter : router,}