const { DataTypes } = require('sequelize');

const Admin = (sequelize) => {
    const admin = sequelize.define('admin_users', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    return admin;
};

module.exports = Admin;
