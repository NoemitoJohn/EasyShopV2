const { DataTypes } = require('sequelize')


const Product = (sequelize) =>{
    
    const Product = sequelize.define('product', {
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
    );
    
    return Product;
}

module.exports = Product