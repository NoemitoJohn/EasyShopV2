const express = require('express')
const {logIn, signUp, getOrders} = require('../controller/adminController')
const router = express.Router()


router.post('/', logIn)

router.post('/signup', signUp)
router.get('/orders', getOrders)


module.exports = {adminRouter : router}