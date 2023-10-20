const DB = require('../models/DB')
const {Op , QueryTypes, json} = require('sequelize')


const getProducts = async (req, res) => {
    
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


    // db.query('select products.id, name, price, stocks, rating, products_info.img_url as thumbnail from products ' +
    // 'inner join products_info on products.id = products_info.productId ' +
    // 'where products.id between ? and ?', [start, start + limit ], function(err ,result){
        
    //     if(err) 
    //     {
    //         console.log(err.message)
    //         throw err
    //     }
        
    //     const data = [];
        
    //     for (const item of result) {
    //         const img_parse = JSON.parse(item.thumbnail)
    //         item.thumbnail = img_parse[0]
    //         data.push(item)
    //     }



    //     res.send(data)
    // })  

    const products = await DB.Product.findAll({

        where : {
            id : {
                [Op.between] : [start, limit]
            }
        }

    })
    
    const product = []
    
    for (const item of products) {
        const productInfo = await DB.ProductInfo.findOne({
            where :{
                product_id: item.id
            }   
        })
        
        const p = JSON.stringify(item)
        
        const productJSON = JSON.parse(p)

        const imgs = JSON.parse(productInfo.img_url)

        productJSON.thumbnail = imgs[0]

        product.push(productJSON)
    }

    res.json(product)
}

const getProduct = async (req, res) =>{
    let id;
    
    if(req.params) id = Number(req.params.id);
    
    const product = await DB.ProductInfo.findOne({
        attributes : ['description', 'img_url'], 
        
        where : {
            id : id
        }, 
        
        include : [
            {
                model : DB.Product
            },
            {
                model : DB.Category,
                attributes : ['name']
            }
        ]
    })


    const productString = JSON.stringify(product)
    
    const productJSON = JSON.parse(productString)

    const img_url =  JSON.parse(productJSON.img_url)

    productJSON.img_url = img_url

    res.json(productJSON)
}


const getProductByCategory = async (req, res) =>{
    
    const db = req.app.get('DB');
    
    const {name} = req.params;

    const products = await DB.instance.query('SELECT p.id, p.name, p.price, p.stocks, p.rating, p_i.img_url as thumbnail from products_info as p_i ' +
        'inner join categories as cat on p_i.categoryId = cat.id ' + 
        'inner join products as p on p.id = p_i.id ' +
        'where cat.name = ?', {
            replacements : [name],
            type: QueryTypes.SELECT,
            raw : true })
    
    const productString = JSON.stringify(products)

    const product = []
    
    for (const item of products) {
        const imgs = JSON.parse(item.thumbnail)
        item.thumbnail = imgs[0]
        product.push(item)
    }
    
    res.json(product)

}

const getCategories = async (req, res) =>{
    const categories = await DB.Category.findAll()
    res.json(categories)
}

module.exports = {
    getProducts,
    getProduct,
    getProductByCategory,
    getCategories
}