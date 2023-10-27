const DB = require('../models/DB')
const {Op, json} = require('sequelize')


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
        
        if(created) return res.send(`${product.name}:  ${typeof req.user.id} added to cart`)
        
        res.send('already exist')


    } catch (error) {
       res.json({status : 500, message: error})
    }
}

const getCart = async (req, res) =>{

    if(!req.user.id){
        return res.json({status: 400, message: 'Please Login'})
    }
    
    const cartQuery = await DB.Cart.findAll({
        include : [
            {
                model : DB.Product,
                require : true,
                attributes : ['id', 'name', 'price'],
                include : [
                {
                    model : DB.ProductInfo,
                    attributes : [[DB.instance.fn('JSON_EXTRACT', DB.instance.col('img_url'), DB.instance.literal('"$[0]"')), 'thumbnail']],
                    require : true
                }]
            }
        ], 
        attributes :[ ['id', 'cart_id'], 'quantity'], 
        
        where : {
            user_id : req.user.id
        }
    })
    
    const cart = []

    res.json(cartQuery)
    
}

//delete
const deleteCart = async (req, res) =>{
    
    if(!req.user){
        return res.json({status: 400, message: 'Please Login'})
    }
    try {
        
        const cart = await DB.Cart.destroy({where :{ id : Number(req.params.id)}}) 
    
        if(cart == 1){
            res.json({status: 200, cart_id : Number(req.params.id)})
        }
        
    } catch (error) {
        throw error
    }

}

//update
const updateCart = async (req , res) =>{
    
    if(!req.user){
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

function getProductThumbnail(json){
    const parse = JSON.parse(json)
    return parse[0]
}



module.exports = {
    postCart,
    getCart,
    deleteCart,
    updateCart
}