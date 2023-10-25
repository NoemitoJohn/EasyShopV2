const jwt = require('jsonwebtoken')
const DB = require('../models/DB')

const isAuth = async (req, res, next) => {
    
    const {authorization} = req.headers

    if(!authorization) return res.json('Invalid request');

    const token = authorization.split(' ')[1];

    try {

        const decode = jwt.verify(token, 'secret')
        console.log(decode)
        
        req.user = await DB.User.findOne(
        {
            where :{
                id : decode.id
            },
            attributes : ['id']

        })
        console.log(JSON.stringify(req.user))
        next()

    } catch (error) {

        res.send('Invalid token')
    
    }
}

module.exports = isAuth