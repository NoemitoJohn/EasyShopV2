const { Sequelize } = require('sequelize');
const Product = require('./Product')
const ProductInfo = require('./ProductInfo');
const Category = require('./Category');
const Address = require('./Address')
const Cart = require('./Cart')
const User = require('./User')
const UserInfo = require('./UserInfo')

const sequelize = new Sequelize(
    'easyshopv2', // database
    'root', // username
    'root', // password 
    {
        dialect : 'mysql'
    }
)

    
const DB = {}

DB.instance = sequelize

// 'users_info'

//Models
DB.Category = Category(sequelize);
DB.Product = Product(sequelize);
DB.ProductInfo = ProductInfo(sequelize);
DB.Address = Address(sequelize);
DB.Cart = Cart(sequelize);
DB.User = User(sequelize);
DB.UserInfo = UserInfo(sequelize);

DB.Category.hasMany(DB.ProductInfo)
DB.ProductInfo.belongsTo(DB.Category)

DB.Product.hasOne(DB.ProductInfo)
DB.ProductInfo.belongsTo(DB.Product)

DB.User.hasOne(DB.UserInfo)
DB.UserInfo.belongsTo(DB.User)

DB.User.hasOne(DB.Address)
DB.Address.belongsTo(DB.User)

DB.Product.hasOne(DB.Cart)
DB.Cart.belongsTo(DB.Product)

DB.User.hasOne(DB.Cart)
DB.Cart.belongsTo(DB.User)


module.exports = DB