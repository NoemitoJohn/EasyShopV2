const { DataTypes } = require('sequelize')


const Cart = (sequelize) =>{
    const cart = sequelize.define('cart', {
        quantity : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    })

    return cart;
}

module.exports  = Cart