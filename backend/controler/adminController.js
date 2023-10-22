const DB = require('../models/DB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = async (_id, _email) => {
    return await jwt.sign({ id: _id, email: _email }, 'adminSecret');
}

const loginAdmin = async (req, res) => {
    const db = req.app.get('DB');

    const { email, password } = req.body;

    const admin = await DB.Admin.findOne({
        where: {
            email: email,
        },
    });

    if (!admin) return res.json({ status: 400, message: 'Admin not found' });

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) return res.json({ status: 400, message: 'Incorrect password' });

    req.session.regenerate((error) => {
        if (error) throw error;

        req.session.admin = { id: admin.id, email: admin.email };

        req.session.save(function (err) {
            if (err) throw err;

            res.json({ status: 200, admin: req.session.admin });
        });
    });
};

const logoutAdmin = function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
        res.json({ status: 200, message: 'Admin Logout Successfully' });
    });
};

const isAuth = function (req, res){

    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }

    const db = req.app.get('DB')

    db.query('select * from users_info where user_id = ?', [req.session.user.id], function (err, data) {
        res.json(data)
    })
}

const getAdminInfo = (req, res) => {
    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }

    const db = req.app.get('DB');

    db.query('select * from admin_info where adminId = ?', [req.session.admin.id], function(err, data){
        if(err) {
            return res.json({status: 500, message: 'Server Error'})
        }
        res.json(data)
    })
}


module.exports = {
    loginAdmin,
    logoutAdmin,
    isAuth,
    getAdminInfo

};



