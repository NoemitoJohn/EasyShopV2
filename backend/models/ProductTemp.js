const { DataTypes } = require('sequelize')


const ProductTest = (sequelize) =>{
    
    const Product = sequelize.define('products_test', {
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
    },
    { freezeTableName: true }
    );
    
    return Product;
}

module.exports = ProductTest