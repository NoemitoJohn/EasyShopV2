const { DataTypes } = require('sequelize')



const UserInfo = (sequelize) =>{
    const userInfo = sequelize.define('users_info', {
        first_name :{
            type : DataTypes.STRING,
            allowNull : false
        },
        last_name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        mobile_number : {
            type : DataTypes.STRING,
            defaultValue: '',
            allowNull : false
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    })

    return userInfo
}

module.exports = UserInfo