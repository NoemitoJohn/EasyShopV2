const jwt = require('jsonwebtoken')
const DB = require('../models/DB')

const isUserAuth = async (req, res, next) => {
    
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

const isAdminAuth = async (req, res, next) => {
    const {authorization} = req.headers
    
    if(!authorization) return res.json('Invalid request');

    const token = authorization.split(' ')[1];

    try {

        const decode = jwt.verify(token, 'secret')
        console.log(decode)
        
        if(!decode.role) throw new Error('Restricted')


        req.admin = await DB.Admin.findOne({
            where : {
                id : decode.id
            },
            attributes: ['id', 'role']
        })

        next()

    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    }


}


module.exports = {isUserAuth, isAdminAuth}