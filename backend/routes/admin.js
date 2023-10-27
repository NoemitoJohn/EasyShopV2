const express = require('express')
const {logIn, signUp, getOrders, getOrder, upateOrder} = require('../controller/adminController')
const router = express.Router()
//TODO: add admin auth middleware

router.post('/', logIn)

router.post('/signup', signUp)
router.get('/orders', getOrders)
router.get('/order/:id', getOrder)
router.patch('/order/', upateOrder)


module.exports = {adminRouter : router}