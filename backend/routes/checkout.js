const express = require('express')
const router = express.Router();
const {checkout, webhook} = require('../controler/checkoutController')


router.post('/', checkout)
router.post('/webhook', webhook)

module.exports = { checkoutRouter : router }