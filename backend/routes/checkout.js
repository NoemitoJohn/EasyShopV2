const express = require('express')

const router = express.Router();
const {checkout, webhook} = require('../controller/checkoutController')

const {isUserAuth} = require('../middleware/isAuth')

router.post('/', isUserAuth, checkout)
router.post('/webhook', express.raw({type: 'application/json'}), webhook)

module.exports = { checkoutRouter : router }
