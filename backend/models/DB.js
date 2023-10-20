const { Sequelize , DataTypes} = require('sequelize');
const Product = require('./Product')
const ProductInfo = require('./ProductInfo');
const Category = require('./Category');
const Address = require('./Address')
const Cart = require('./Cart')
const User = require('./User')
const UserInfo = require('./UserInfo')
const Verified = require('./Verified')

// ### Production 
const sequelize = new Sequelize(
    process.env.DB_DATABASE, // database
    process.env.DB_USERNAME, // username
    process.env.DB_PASSWORD, // password 
    {
        host :  process.env.DB_HOST,
        port : process.env.DB_PORT,
        dialect : 'mysql',
        logging: false
    }
)

// ### Development
// const sequelize = new Sequelize(
//     'easyshopv2', // database
//     'root', // username
//     'root', // password 
//     {
//         // host : 'e-p.h.filess.io',
//         // port : 3307,
//         dialect : 'mysql',
//         // logging: false
//     }
// )

    
const DB = {}

DB.instance = sequelize
DB.Sequelize = Sequelize

// 'users_info'

//Models
DB.User = User(sequelize);
DB.Category = Category(sequelize);
DB.Product = Product(sequelize);
DB.ProductInfo = ProductInfo(sequelize);
DB.Address = Address(sequelize);
DB.Cart = Cart(sequelize);
// DB.UserInfo = UserInfo(sequelize);
DB.Verified = Verified(sequelize);

DB.Category.hasMany(DB.ProductInfo, {foreignKey: 'category_id'})
DB.ProductInfo.belongsTo(DB.Category, {foreignKey: 'category_id'})

DB.Product.hasOne(DB.ProductInfo, {foreignKey: 'product_id'})
DB.ProductInfo.belongsTo(DB.Product, {foreignKey: 'product_id'})

DB.User.hasOne(DB.Address, {foreignKey: 'user_id'})
DB.Address.belongsTo(DB.User, {foreignKey: 'user_id'})

DB.Product.hasOne(DB.Cart, {foreignKey: 'product_id'})
DB.Cart.belongsTo(DB.Product, {foreignKey: 'product_id'})

DB.User.hasOne(DB.Cart, {foreignKey: 'user_id'})
DB.Cart.belongsTo(DB.User, {foreignKey: 'user_id'})

DB.User.hasOne(DB.Verified, {foreignKey: 'user_id'})
DB.Verified.belongsTo(DB.User, {foreignKey: 'user_id'})

// DB.Product.sync({force : true})
// DB.ProductInfo.sync({force : true})
// DB.Cart.sync({force : true})

// DB.instance.sync({force: true})
const init = async () => {

    try {
        await DB.instance.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

init()



module.exports = DB