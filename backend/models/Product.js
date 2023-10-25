const { DataTypes } = require('sequelize')


const Product = (sequelize) =>{
    
    const Product = sequelize.define('products', {
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        price: {
            type : DataTypes.DOUBLE,
            allowNull : false
        },
        rating : {
            type : DataTypes.FLOAT,
            defaultValue : 0
        },
        stocks : {
            type : DataTypes.INTEGER,
            allowNull: false
        }
    },
    { freezeTableName: true }
    );
    
    return Product;
}

module.exports = Product