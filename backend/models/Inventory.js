const { DataTypes } = require('sequelize')


const Invertory = (sequelize) =>{
    const inventory = sequelize.define('inventory',{
        in : {
            type : DataTypes.INTEGER, 
            allowNull : false 
        }, 
        out : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        }
    },
    )
    
    return inventory;
}


module.exports = Invertory