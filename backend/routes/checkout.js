const express = require('express')

const router = express.Router();
const {checkout, webhook,testCheckout} = require('../controller/checkoutController')

const isAuth = require('../middleware/isAuth')

router.post('/', isAuth, checkout)
router.post('/webhook', express.raw({type: 'application/json'}), webhook)
router.post('/test',isAuth, testCheckout)

module.exports = { checkoutRouter : router }
