const DB = require('../models/DB')
const {Op} = require('sequelize')


const postCart = async (req, res) => {
    if(!req.user.id){
        return res.json({status: 400, message: 'Please Login'})
    }
    
    const productId = req.body.product_id
    const productQty = req.body.quantity
    try {
        
        
        const [cart, created] = await DB.Cart.findOrCreate({
            where : {
                [Op.and] : [
                    {user_id : req.user.id},
                    {product_id : productId}
                ]   
            }, 
            defaults : {
                product_id : productId,
                quantity : productQty,
                user_id : req.user.id
            }
            
        })

        // const cart = await DB.Cart.create({product_id : product_id, quantity : quantity, user_id : req.session.user.id})
        
        const product = await DB.Product.findOne({where : { id : cart.product_id}})
        
        if(created) return res.send(`${product.name} added to cart`)
        
        res.send('already exist')


    } catch (error) {
       res.json({status : 500, message: error})
    }
}

const getCart = async (req, res) =>{
    console.log(req.session)
    if(!req.user.id){
        return res.json({status: 400, message: 'Please Login'})
    }
    
    const cart = await DB.Cart.findAll({
        include : [
            {
                model : DB.Product,
                require : true,
                attributes : ['id', 'name', 'price']
            }
        ], 
        attributes :[ ['id', 'cart_id'], 'quantity'], 
        
        where : {
            user_id : req.user.id
        }
    })
    

    
    res.json(cart)
    
}

//delete
const deleteCart = async (req, res) =>{
    
    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }
    

    const {cart_id} = req.body
    
    // const db = req.app.get('DB')
    
    const cart = await DB.Cart.destroy({where :{ id : cart_id}}) 


    res.json({status: 200})
}

//update
const updateCart = async (req , res) =>{
    
    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }
    
    const {cart_id, quantity} = req.body
    try {
        const cart = await DB.Cart.update({ quantity : quantity},
            {
                where : {
                    id : cart_id
                }
            })
        res.send(cart)
    } catch (error) {
        throw error
    }

}


module.exports = {
    postCart,
    getCart,
    deleteCart,
    updateCart
}