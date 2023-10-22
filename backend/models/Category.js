const { DataTypes } = require('sequelize')


const Category = (sequelize) =>{
    const Category = sequelize.define('categories',{
        name: {
            type : DataTypes.STRING,
            allowNull : false,
            unique: true
        }
    },
    {
        freezeTableName: true
    }
    )
    
    return Category;
}


module.exports = Category