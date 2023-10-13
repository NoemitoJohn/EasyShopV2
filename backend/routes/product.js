const express = require('express')
const router = express.Router();
const {getAllProducts, getProduct} = require('../controler/productControler')
const {getCartCount} = require('./cart')
const axios = require('axios');

router.get('/', getAllProducts)

router.get('/:id', getProduct)

function singleProductObject(p){
    return {
        id: p.id,
        title: p.title,
        desc: p.description,
        discount : p.discountPercentage,
        price: p.price,
        rating: p.rating,
        stock: p.stock,
        brand: p.brand,
        imgs : p.images
    }
}

function productsDataArrayToObject(products){
    
    const arr = []
    
    for (const product of products) {
       
        const productInfo = {
            id: product.id,
            title: product.title,
            price: product.price,
            rating: product.rating,
            cat: product.category,
            stock: product.stock,
            image: product.thumbnail
        }
        
        arr.push(productInfo)
    }
    return arr;
}
    




module.exports = { productRouter : router,  productsDataArrayToObject}