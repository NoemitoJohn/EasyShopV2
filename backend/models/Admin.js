const { DataTypes } = require('sequelize')


const Admin = (sequelize) =>{
    const admin = sequelize.define('admins', {
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
        role :{ 
            type : DataTypes.ENUM('admin','other'),
            allowNull : false,
            defaultValue : 'admin'
        }
    },
    {
        freezeTableName: true
    })

    return admin
}

module.exports = Admin