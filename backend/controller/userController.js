const bcrypt = require('bcrypt');
const DB = require('../models/DB')
const jwt = require('jsonwebtoken')
const { sendValidationEmail } = require('../service/EmailProvider') 


const logout = function (req, res) {
    req.session.destroy(function(err){
        if(err) throw err
        res.json({status: 200, message: 'Logout Successfully'})
    })
}


const isAuth = function (req, res){
    
    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }
    
    const db = req.app.get('DB')
    
    db.query('select * from users_info where user_id = ?', [req.session.user.id], function (err, data) {
        res.json(data)
    })
}

const getUserInfo = function (req, res){
    
    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }
    
    const db = req.app.get('DB');
    
    db.query('select * from users_info where userId = ?', [req.session.user.id], function(err, data){
        if(err) {
            return res.json({status: 500, message: 'Server Error'})
        }
        res.json(data)
    })
}

const login =  async (req, res) => {
    
    const {email, password} = req.body
    
    
    const user = await DB.User.findOne({
        where:{
            email : email
        } 
    })
    
    if(!user) return res.json({status : 400, message : 'Email is not Register'})
    
    const validPassword = await bcrypt.compare(password, user.password)
    
    if(!validPassword) return res.json({status : 400, message : 'Password inccorect'})
    
    const verified = await DB.Verified.findOne({where :{user_id : user.id}})
    
    if(!verified.isVerified) return res.json({status : 400, message : 'Please confirm the email verification link we sent to your email'})
    
    const userToken = await jwt.sign({id: user.id, email: user.email}, 'secret', {expiresIn: '1d'} )

    res.json({status: 200, user : { email: user.email}, token : userToken })

    
}

const signup = async (req, res) =>{

    const {firstName, lastName, password, repeatPassword } = req.body;
    const _email = req.body.email
   
    if(password == repeatPassword){
        
        const t = await DB.instance.transaction()
        
        try {
            
            const hashpass = await bcrypt.hash(password, 10)
            
            
            const user = await DB.User.create({password : hashpass, email: _email,  first_name : firstName, last_name: lastName}, { transaction : t})
        
            const emailToken = await jwt.sign({id : user.id }, 'secret', {expiresIn: '1d'})
        
            await DB.Verified.create({token : emailToken, user_id : user.id}, { transaction : t})
            
            const link = `${process.env.CLIENT_URL}/signup/verify/${emailToken}`

            const email = await sendValidationEmail(user.first_name, user.email, link)

            if(email){
                await t.commit()
                res.send({status: 200})
            }

        } catch (error) {
            await t.rollback()
            if(error.original)
            {
                if(error.original.code == "ER_DUP_ENTRY") 
                    return res.send({status : 400, message : 'Email already taken'})
            }

            console.log(error)
            res.send({status : 500, error : error})
        }
    
    }else{
        res.send({status : 400, message : 'Password not match'})
    }
}

const verifyUser = async (req, res) => {
    try{
        // TODO add id
        const {token} = req.params
        
        const decodeToken  = await jwt.verify(token, 'secret')
        console.log(decodeToken)
        console.log(decodeToken)
        const verifiedUser = await DB.Verified.findOne({where : { user_id : decodeToken.id}})
        
        if(verifiedUser.isVerified) return res.json({status : 400, message : 'This link already Verified'})

        verifiedUser.isVerified = true;

        const isVerified = await verifiedUser.save()

        if(isVerified) return res.json({status : 200})
        // res
    } catch(error) {
        res.send(error.name)
    }

    

}


const getAddress = async (req, res) =>{
    //
    if(!req.user) res.status(403).send()
    console.log(req.body)
    
    const address = await DB.Address.findOne(
    {
        where : 
        {
            user_id : req.user.id
        },
        attributes: { exclude: ['createdAt', "updatedAt"] }
    })
    res.json(address)
}

const setAddress = async (req, res) => {
    if(!req.user) return res.status(403).send()

    try {
        const [address, created] = await DB.Address.findOrCreate({
            where : {
                user_id : req.user.id
            },
            defaults : {
                address_line_1 : req.body.add1,
                address_line_2 : req.body.add2,
                city : req.body.city, 
                country : req.body.country,
                zipcode : Number(req.body.zip)
            }
        })
        if(created){
            res.status(200).json(address)
        }
        
    } catch (error) {
        console.log(error)
    }   





    
    // const {address_line_1, address_line_2, city, country, zipcode} = req.body
    // const db = req.app.get('DB');
    
    // db.beginTransaction(function(err){
    //     if(err) return res.json({status: 500, message: 'Server Error'})
        
    //     db.query('insert into users_address(user_id, address_line_1, address_line_2, city, country, zipcode) values (?, ?, ?, ?, ?, ? )', 
    //     [
    //         req.session.user.id,
    //         address_line_1,
    //         address_line_2,
    //         city,
    //         country,
    //         zipcode
    //     ], 
    //     function(err, result){
    //         if(err) return res.json({status: 500, message: 'Server Error'})
            
    //         const insertId = result.insertId
            
    //         db.query('update users_info set user_address_id = ? where user_id = ?', [insertId, req.session.user.id], function(err, result){
    //             if(err) return res.json({status: 500, message: 'Server Error'})
                
    //             db.commit(err =>{
    //                 res.json({status: 200})
    //             })
    //         })
    //     })
        
        
    // })
    
}



module.exports = {
    login,
    signup,
    logout,
    isAuth,
    getUserInfo,
    getAddress,
    setAddress,
    verifyUser
}
