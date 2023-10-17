const { DataTypes } = require('sequelize')


const Address = (sequelize) =>{
    const Address = sequelize.define('users_address', {
        address_line_1 :{
            type : DataTypes.STRING,
            allowNull: false
        },
        
        address_line_2 : {
            type : DataTypes.STRING,

        },
        
        city : {
            type : DataTypes.STRING,
            allowNull : false
        },
        
        country : {
            type : DataTypes.STRING,
            allowNull : false
        },
        
        zipcode : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    { 
        timestamps: false ,
        freezeTableName: true
    }) 
    return Address
    
}

module.exports = Address


