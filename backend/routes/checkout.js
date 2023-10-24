const express = require('express')

const router = express.Router();
const {checkout, webhook} = require('../controller/checkoutController')

const isAuth = require('../middleware/isAuth')

router.post('/', isAuth, checkout)
router.post('/webhook', express.raw({type: 'application/json'}), webhook)

module.exports = { checkoutRouter : router }
