const express = require('express');
const router = express.Router();
const {
    loginAdmin,
    logoutAdmin,
    getAdminInfo,
    isAuth,
    getAdminInfo,
    
} = require('./controller/adminController');

router.post('/login', loginAdmin)
router.post('/logout', logoutAdmin)

router.get('/info', getAdminInfo)
router.get('/auth', isAuth)


module.exports = { adminRouter: router };
