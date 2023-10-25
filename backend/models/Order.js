const { DataTypes } = require('sequelize')


const ORDER_STATUS = {
    RECEIVED : 'receive',
    SHIPPING : 'shipping',
    PENDING : 'pending'
}

const Order = (sequelize) => {
    const order = sequelize.define('orders',{
        product_item : {
            type : DataTypes.JSON,
            allowNull : false
        },
        total : {
            type : DataTypes.DOUBLE,
            allowNull : false,
        },
        transaction_id :{
            type : DataTypes.TEXT,
            allowNull : false
        },
        status : {
            type : DataTypes.ENUM(ORDER_STATUS.PENDING, ORDER_STATUS.SHIPPING, ORDER_STATUS.RECEIVED),
            defaultValue : ORDER_STATUS.PENDING,
            allowNull : false
        }
    })
    return order

}

module.exports = {Order, ORDER_STATUS}