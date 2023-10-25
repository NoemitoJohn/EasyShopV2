const { DataTypes } = require('sequelize')


const User = (sequelize) =>{
    const user = sequelize.define('users', {
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique: true
        },
        password : {
            type: DataTypes.STRING,
            allowNull : false
        },
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
        freezeTableName: true
    })

    return user
}

module.exports = User