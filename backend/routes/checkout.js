const express = require('express')
const router = express.Router();
const {checkout, webhook} = require('../controller/checkoutController')


router.post('/', checkout)
router.post('/webhook', webhook)

module.exports = { checkoutRouter : router }