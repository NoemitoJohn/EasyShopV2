const express = require('express')
const router = express.Router();
const {upload} = require('../middleware/uploader')
const {
    getProducts,
    getProduct,
    getProductByCategory,
    getCategories,
    getAllProducts,
    addProduct

} = require('../controller/productController')


router.get('/', getProducts)
router.get('/all', getAllProducts)
router.get('/category/:name', getProductByCategory)
router.get('/categories', getCategories)
router.get('/:id', getProduct)

router.post('/', upload.array('my_file', 4), addProduct)

module.exports = { productRouter : router,}