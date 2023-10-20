const { DataTypes } = require('sequelize')



const UserInfo = (sequelize) =>{
    const userInfo = sequelize.define('users_info', {
       
    },
    {
        freezeTableName: true
    })

    return userInfo
}

module.exports = UserInfo