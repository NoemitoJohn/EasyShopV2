const getProducts = (req, res)=>{
    
    let start = 0
    let limit = 20
    
    //get how many products in the database count()
    // if the start query >= limit
    // set limit to count()

    if(req.query){
        if(req.query.start) start  = Number(req.query.start)
        if(req.query.limit) limit  = Number(req.query.limit)
    }

    const db = req.app.get('DB')


    db.query('select * from products where id between ? and ?', [start, start + limit ], function(err ,result){
        if(err) 
        {
            console.log(err.message)
            throw err
        }

        res.send(result)
    })  

}

const getProduct = (req, res) =>{
    let id;
    
    if(req.params) id = Number(req.params.id);
    
    const db = req.app.get('DB');
    
    db.query('select products.id, products.name, products.price, products.stocks, products.rating, products_info.description as decs, categories.name as cat_name, products_info.img_url from products ' + 
            'inner join products_info on products.id = products_info.product_id ' + 
            'inner join categories on categories.id = products_info.category_id ' +
            'where products.id = ?' , [id] , (err, result) =>{
        if(err) throw err
        const data = result[0]
        const parse = JSON.parse(data.img_url)
        data.img_url = parse
        res.json(data)
    })

}


const getProductByCategory = (req, res) =>{
    
    const db = req.app.get('DB');
    
    const {name} = req.params;

    db.query(
        'SELECT p.id, p.name, p.price, p.stocks, p.rating from products_info as p_i ' +
        'inner join categories as cat on p_i.category_id = cat.id ' + 
        'inner join products as p on p.id = p_i.id ' +
        'where cat.name = ?'
     , 
    [name],
    function(err, result){
        if(err) {
            res.json({status: 500, message: 'Server Error'})
            console.log(err)
        }

        res.json({status: 200, data :result})
        
    })
}

const getCategories = (req, res) =>{
    const db = req.app.get('DB');
    db.query('select name from categories', function(err, result){
        
        if(err) {
            res.json({status: 500, message: 'Server Error'})
            console.log(err)
        }

        res.json({status: 200, data: result})
    })

}

module.exports = {
    getProducts,
    getProduct,
    getProductByCategory,
    getCategories
}