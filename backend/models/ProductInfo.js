const {DataTypes} = require('sequelize')


const ProductInfo = (sequelize) =>{
    
    const product_info = sequelize.define('products_info', {

        description :{
            type: DataTypes.STRING,
            allowNull: false,
        },

        img_url :{
            type : DataTypes.JSON,
        }
    },
    { 
        freezeTableName: true
    }
    );
    
    return product_info;
}

module.exports = ProductInfo