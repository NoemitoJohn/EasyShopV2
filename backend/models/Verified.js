const { DataTypes } = require('sequelize')


const Verified = (sequelize) =>{
    const verified = sequelize.define('verified', {
        isVerified :{
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue: false,
        },
        token : {
            type : DataTypes.TEXT,
            allowNull : false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    })

    return verified
}

module.exports = Verified