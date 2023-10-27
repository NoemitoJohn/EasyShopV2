const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {isUserAuth} = require('../middleware/isAuth')

const {
    login, 
    signup,
    logout,
    isAuth,
    getUserInfo,
    getAddress,
    setAddress,
    verifyUser
} = require('../controller/userController')

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

router.get('/auth', isAuth)
router.get('/info',getUserInfo)

router.get('/address', isUserAuth, getAddress)
router.post('/address', isUserAuth , setAddress)
router.post('/verify/:token', verifyUser)

module.exports  = { userRouter : router}