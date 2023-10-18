const { DataTypes } = require('sequelize')



const UserInfo = (sequelize) =>{
    const userInfo = sequelize.define('users_info', {
       
    },
    {
        timestamps: false,
        freezeTableName: true
    })

    return userInfo
}

module.exports = UserInfo