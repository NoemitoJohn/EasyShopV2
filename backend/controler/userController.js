const bcrypt = require('bcrypt');
const DB = require('../models/DB')
const jwt = require('jsonwebtoken')



const creteToken = async (_id, _email) =>{
    return  await jwt.sign({id : _id, email : _email }, 'secret')
}

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
    // req.session.user.id
    
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
    
    const db = req.app.get('DB')
    
    const {email, password} = req.body
    
    
    const user = await DB.User.findOne({
        where:{
            email : email
        } 
    })
    
    if(!user) return res.json({status : 400, message : 'Email is not Registered'})
    
    const validPassword = await bcrypt.compare(password, user.password)
    
    if(!validPassword) return res.json({status : 400, message : 'Password inccorect'})
    
    const verified = await DB.Verified.findOne({where :{user_id : user.id}})
    
    if(!verified.isVerified) return res.send('Please confirm the email verification link')
    
    req.session.regenerate((error) =>{
        if(error) throw error
        
        req.session.user = {id : user.id , email : user.email}
        
        req.session.save(function (err) {
            if(err) throw err
            res.json({status: 200, user : req.session.user })
        });
        
    })
    
    
    
    // console.log(user)
    // db.query('select id, password, email from users where email = ?', [email], function (err, data) {
    
    //     if(err) return res.json({status: 500, message: 'Server Error'})
    
    //     if(!err && data.length <= 0) {
    //         return res.json({status: 400, message : 'Email is not registered'})
    //     }
    
    //     bcrypt.compare(password, data[0].password, function (err, result) {
    //         if(err) throw err
    
    //         if(!result) return res.json({status: 400, message: 'Password is incorrect'})
    
    //         // get email from database 
    
    //         req.session.regenerate(function (err) {
    
    //             req.session.user = { id: data[0].id, email : data[0].email }
    //             req.session.save(function (err) {
    //                 if(err) throw err
    
    //                 res.json({status: 200, user : req.session.user })
    //             })
    //         })
    
    //     })
    // })
}

const signup = async (req, res) =>{
    
    const db = req.app.get('DB');
    

    const {firstName, lastName, email, password, repeatPassword } = req.body;
    // TODO: validate all inputs if not empty
    if(password == repeatPassword){
        
        try {
            
            const hashpass = await bcrypt.hash(password, 10)
            
            
            const t = await DB.instance.transaction()
            
            const user = await DB.User.create({email: email, password : hashpass, first_name : firstName, last_name: lastName}, {transaction : t})
            
            //res.json({id : user.id, email : user.email})
            
            const token = await creteToken(user.id, user.email)
            
            const verified = await DB.Verified.create({token : token, user_id : user.id}, { transaction : t})
            
            
            await t.commit()
            res.send('Verification email sent!')
        } catch (error) {
            throw error
        }
        
        // db.beginTransaction(function (err) {
        //     if(err) { 
        //         res.json({status : 500, message: 'Server Error!'})
        //         throw err
        //}
        
        
        //     db.query('insert into users (email, password) values (?, ?)', [email, hashpass], function (err, result) {
        //         if(err) {
        //             res.json({status : 400, message: 'Email already exist'})
        //             return db.rollback();
        //         }
        //         // insertId
        
        //         const userId = result.insertId
        
        //         db.query('insert into users_info (userId, first_name, last_name, mobile_number) values (?, ?, ? ,?)',
        //             [userId, firstName, lastName, ''],
        //             function (err, result)
        //             {
        //                 if(err) {
        //                     res.json({status : 400, message: 'Fields cannot be empty'})
        //                     return db.rollback();  
        //                 } 
        
        //                 db.commit(err =>{
        //                     if(err) {
        //                         res.json({status : 500, message: 'Server Error'})
        //                         return db.rollback(); 
        //                     }  
        
        //                     res.json({status: 200, message: 'Account Created'})
        //                 })
        //             })
        //     })
        // })
    }
}

const getAddress = (req, res) =>{
    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }
    const db = req.app.get('DB');
    
    db.query('select * from users_address where user_id = ?', [req.session.user.id], function(err, result){
        if(err) {
            console.log(err)
            return res.json({status: 500, message: 'Server Error'})
        }
        
        res.json(result)
    })
}

const setAddress = (req, res) =>{
    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }
    
    
    const {address_line_1, address_line_2, city, country, zipcode} = req.body
    const db = req.app.get('DB');
    
    db.beginTransaction(function(err){
        if(err) return res.json({status: 500, message: 'Server Error'})
        
        db.query('insert into users_address(user_id, address_line_1, address_line_2, city, country, zipcode) values (?, ?, ?, ?, ?, ? )', 
        [
            req.session.user.id,
            address_line_1,
            address_line_2,
            city,
            country,
            zipcode
        ], 
        function(err, result){
            if(err) return res.json({status: 500, message: 'Server Error'})
            
            const insertId = result.insertId
            
            db.query('update users_info set user_address_id = ? where user_id = ?', [insertId, req.session.user.id], function(err, result){
                if(err) return res.json({status: 500, message: 'Server Error'})
                
                db.commit(err =>{
                    res.json({status: 200})
                })
            })
        })
        
        
    })
    
}



module.exports = {
    login,
    signup,
    logout,
    isAuth,
    getUserInfo,
    getAddress,
    setAddress
}
