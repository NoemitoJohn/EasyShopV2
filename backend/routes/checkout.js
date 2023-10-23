const express = require('express')
const router = express.Router();
const {checkout, webhook} = require('../controller/checkoutController')
const isAuth = require('../middleware/isAuth')

router.use(isAuth)

router.post('/', checkout)
router.post('/webhook', webhook)

module.exports = { checkoutRouter : router }