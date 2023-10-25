const DB = require('../models/DB')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const logIn = async (req, res) =>{
    //TODO: add validation 

    const {email, password} = req.body

    const admin = await DB.Admin.findOne({
        where : {email : email},
        attributes : ['id', 'email', 'role', 'password']
    })
    if(!admin) return res.json('Incorrect email')
    
    const validPassword = await bcrypt.compare(password, admin.password)

    if(!validPassword) return res.json('Incorrect password')

    const adminToken = await jwt.sign({id : admin.id, email : admin.email, role : admin.role}, 'secret', {expiresIn: '1d'})

    res.json({email : admin.email, token : adminToken})

}


const signUp = async (req, res) => {
    //TODO: add validation
    const {email, password, fName, lName} = req.body
    try {
        const hash = await bcrypt.hash(password, 10)
        const admin = await DB.Admin.create({
            email : email,
            password : hash,
            first_name : fName,
            last_name : lName
        })
        if(admin){
            res.json({status : 200})
        }
    } catch (error) {
        console.log(error)
    }
}   

const getOrders = async (req, res) =>{
    const orders = await DB.Order.findAll({where : { id : 4}})
    res.json(orders)
}



module.exports = {logIn, signUp, getOrders }