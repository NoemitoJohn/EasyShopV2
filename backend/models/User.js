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
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    })

    return user
}

module.exports = User