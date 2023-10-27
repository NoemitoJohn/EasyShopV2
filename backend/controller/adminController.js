const DB = require('../models/DB')
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const logIn = async (req, res) =>{
    
    
    const {email, password} = req.body
    
    if(validator.default.isEmpty(email) || validator.default.isEmpty(password)){
        return res.status(400).json({error : 'all fields cannot be empty'})
    }
    if(!validator.default.isEmail(email)){
        return res.status(400).json({error : 'Not a valid email'})
    }
    
    try {
        const admin = await DB.Admin.findOne({
            where : {email : email},
            attributes : ['id', 'email', 'role', 'password']
        })
        if(!admin) return res.status(400).json('Incorrect email')
        
        const validPassword = await bcrypt.compare(password, admin.password)
    
        if(!validPassword) return res.json('Incorrect password')
    
        const adminToken = await jwt.sign({id : admin.id, email : admin.email, role : admin.role}, 'secret', {expiresIn: '1d'})
    
        res.status(200).json({email : admin.email, token : adminToken})
        
    } catch (error) {
        console.log(error)    
    }

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
    const orders = await DB.Order.findAll()
    res.json(orders)
}


const getOrder = async (req, res) =>{
    const {id} = req.params
    try{
        const order = await DB.Order.findOne({
            where :{
                id : Number(id)
            },
            include : [
                {
                    model : DB.User,
                    attributes: ['first_name', 'last_name']
    
                }
            ]
    
        })
        res.json(order)

    }catch(error){
        console.log(error)
    }
}

const upateOrder = async (req, res) =>{
    
    const {id, status} = req.body;
    const statusCode = DB.Order.Status
    
    let _status;
    
    switch(status){

        case statusCode.SHIPPING : 
            _status = statusCode.SHIPPING;
            break;
        case statusCode.RECEIVED : 
            _status = statusCode.RECEIVED;
            break;
        default :
            _status = statusCode.PENDING;
            break;

    }
    try {
        const success = await DB.Order.update({status : _status},
            {
                where : {
                    id: id
                }
            })
    
        if(success == 1){
            res.json(_status)
        }
        
    } catch (error) {
        console.log(error)
    }
}




module.exports = {logIn, signUp, getOrders, getOrder, upateOrder }