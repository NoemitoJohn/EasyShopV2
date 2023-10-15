const postCart = (req, res) => {
    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }

    const db = req.app.get('DB')
    
    const {product_id , quantity} = req.body

    db.query('insert into cart (user_id, product_id, quantity) values(?, ?, ?)', [req.session.user.id, product_id, quantity], function(err, result){
        
        if(err) return res.json({status: 500, message: 'Server Error'})
        
        res.json({status: 200})
    })
}

const getCart = (req, res) =>{
    
    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }

    const db = req.app.get('DB')

    db.query('SELECT cart.id as cart_id, products.name, cart.quantity,  products.price FROM cart inner join products on cart.product_id = products.id where user_id = ?', [req.session.user.id], function(err, result){
        
        if(err) 
        {
            console.log(err)
            return res.json({status: 500, message: 'Server Error'})
        }
        
        const data = {
            items : result.length,
            products : result
        }

        res.json(data)
    })
}

//delete
const delCart = (req, res) =>{
    
    if(!req.session.user){
        return res.json({status: 400, message: 'Please Login'})
    }
    
    const {cart_id} = req.body

    const db = req.app.get('DB')

    db.query('delete from cart where id = ?', [cart_id], function(err, result){
        if(err) {
            console.log(err)
            return res.json({status: 500, message: 'Server Error'})
        }

        res.json({status:200})

    })

}

//update



module.exports = {
    postCart,
    getCart,
    delCart
}