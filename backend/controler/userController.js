const bcrypt = require('bcrypt');

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

    db.query('select * from users_info where user_id = ?', [req.session.user.id], function(err, data){
        if(err) {
            return res.json({status: 500, message: 'Server Error'})
        }
        res.json(data)
    })
}

const login =  function (req, res) {

    const db = req.app.get('DB')
   
    const {email, password} = req.body

    db.query('select id, password, email from users where email = ?', [email], function (err, data) {
        
        if(err) return res.json({status: 500, message: 'Server Error'})

        if(!err && data.length <= 0) {
            return res.json({status: 400, message : 'Email is not registered'})
        }

        bcrypt.compare(password, data[0].password, function (err, result) {
            if(err) throw err
            
            if(!result) return res.json({status: 400, message: 'Password is incorrect'})
            
            // get email from database 

            req.session.regenerate(function (err) {

                req.session.user = { id: data[0].id, email : data[0].email }
                req.session.save(function (err) {
                    if(err) throw err
                    
                    res.json({status: 200, user : req.session.user })
                })
            })

        })
    })
}

const signup = async (req, res) =>{

    const db = req.app.get('DB');

    const {firstName, lastName, email, password, repeatPassword } = req.body;
    // TODO: validate all inputs if not empty
    if(password == repeatPassword){

        const hashpass = await bcrypt.hash(password, 10)

        db.beginTransaction(function (err) {
            if(err) { 
                res.json({status : 500, message: 'Server Error!'})
                throw err
            }
            
            db.query('insert into users (email, password) values (?, ?)', [email, hashpass], function (err, result) {
                if(err) {
                    res.json({status : 400, message: 'Email already exist'})
                    return db.rollback();
                }
                // insertId

                const userId = result.insertId

                db.query('insert into users_info (user_id, first_name, last_name, mobile_number) values (?, ?, ? ,?)',
                    [userId, firstName, lastName, ''],
                    function (err, result)
                    {
                        if(err) {
                            res.json({status : 400, message: 'Fields cannot be empty'})
                            return db.rollback();  
                        } 

                        db.commit(err =>{
                            if(err) {
                                res.json({status : 500, message: 'Server Error'})
                                return db.rollback(); 
                            }  

                            res.json({status: 200, message: 'Account Created'})
                        })
                    })
            })
        })
    }
}

module.exports = {
    login,
    signup,
    logout,
    isAuth,
    getUserInfo
}
