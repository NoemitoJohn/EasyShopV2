const express = require('express')
const router = express.Router();

const {
    getProducts,
    getProduct,
    getProductByCategory,
    getCategories,
    getAllProducts,
} = require('../controller/productController')


router.get('/', getProducts)
router.get('/all', getAllProducts)
router.get('/category/:name', getProductByCategory)
router.get('/categories', getCategories)
router.get('/:id', getProduct)




module.exports = { productRouter : router,}