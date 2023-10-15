const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {
    login, 
    signup,
    logout,
    isAuth,
    getUserInfo,
    getAddress,
    setAddress
} = require('../controler/userController')

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

router.get('/auth', isAuth)
router.get('/info',getUserInfo)

router.get('/address', getAddress)
router.post('/address', setAddress)


module.exports  = { userRouter : router}