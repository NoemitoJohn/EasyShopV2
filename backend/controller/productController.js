const DB = require('../models/DB')
const {Op , QueryTypes} = require('sequelize')
const {handleUpload, createFolder} = require('../middleware/uploader')

const getAllProducts = async (req, res) => {
    const {count, rows} =  await DB.Product.findAndCountAll({
        attributes : ['id', 'name', 'price'],
        include : [
            {
                model : DB.ProductInfo,
                attributes : ['description',[DB.instance.fn('JSON_EXTRACT', DB.instance.col('img_url'), DB.instance.literal('"$[0]"')), 'thumbnail'] ], 
                include : [
                    {
                        model : DB.Category,
                        attributes : ['id', 'name']
                    }
                ]
            },
            {
                model : DB.Inventory,
                attributes: ['in', 'out']
            }
        ]
    })

    res.json({total : count, products : rows})
}



const getProducts = async (req, res) => {
    
    let start = 0
    const limit = 20
    
    if(req.query){
        if(req.query.start) start  = Number(req.query.start)
        
    }
    
    console.log(start)
    
    const products = await DB.Product.findAll({

        where : {
            id : {
                [Op.between] : [start, start + limit]
            }
        }, 

        include : [{
            model : DB.ProductInfo,
            attributes : [[DB.instance.fn('JSON_EXTRACT', DB.instance.col('img_url'), DB.instance.literal('"$[0]"')), 'thumbnail']],
            include : [{
                model : DB.Category,
                attributes : ['id', 'name']   
            }]
        }],
        attributes: { exclude : ['createdAt', 'updatedAt']}

    })
    
    // const product = []
    
    // for (const item of products) {
    //     const productInfo = await DB.ProductInfo.findOne({
    //         where :{
    //             product_id: item.id
    //         }   
    //     })
        
        // const p = JSON.stringify(item)
        
        // const productJSON = JSON.parse(p)
    
        // productJSON.thumbnail = img_url[0]

        // product.push(productJSON)
    // }

     res.json(products)
}

const getProduct = async (req, res) =>{
    let id;
    
    if(req.params) id = Number(req.params.id);
    
    const product = await DB.ProductInfo.findOne({
        attributes : ['description', 'img_url',], 
        
        where : {
            product_id : id
        }, 
        
        include : [
            {
                model : DB.Product, 
                attributes : {exclude : ['updatedAt', 'createdAt', 'inventory_id']},
                include : [
                    {
                        model : DB.Inventory,
                        attributes : ['in', 'out']
                    }]
            },
            {
                model : DB.Category,
                attributes : ['name']
            },
            
        ]
    })
    
    
    res.json(product)
}


const getProductByCategory = async (req, res) =>{
    
    const {name} = req.params;


    const products = await DB.instance.query('SELECT p.id, p.name, p.price, p.rating, p_i.img_url as thumbnail from products_info as p_i ' +
    'inner join categories as cat on p_i.category_id = cat.id ' + 
    'inner join products as p on p.id = p_i.product_id ' +
    'where cat.name = ?', {
        replacements : [name],
        type: QueryTypes.SELECT,
        raw : true })
        
        
        const product = []
        
        for (const item of products) {
            item.thumbnail = item.thumbnail[0]
            product.push(item)
        }
        
    res.json(product)
        
}
    
    
    
const getCategories = async (req, res) => {
    const categories = await DB.Category.findAll({
        attributes : ['id', 'name']
    })
    res.json(categories)
}
    

const addProduct = async (req, res)=>{
    //TODO: check if admin 
    //TODO:  validate inputs

    const t = await DB.instance.transaction()

    //create product
    let product;
    
    try {
        product = await DB.Product.create({
            name : req.body.name,
            price : Number(req.body.price),
            stocks : Number(req.body.stoks)
        }, {transaction : t})
        
    } catch (error) {
        t.rollback()
        console.log('Failed to create product', error)
    }

    try {
        const imagesURL = []
        const subFolder = await createFolder(product.id)
        //subFolder.path
        for (const image of req.files) {
            const b64 = Buffer.from(image.buffer).toString('base64')
            
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            
            const file = await handleUpload(dataURI, subFolder.path)

            imagesURL.push(file.secure_url)
        }
       
        const imageURLStr = JSON.stringify(imagesURL)

        const imageURLParse = JSON.parse(imageURLStr)

        const productInfo = await DB.ProductInfo.create({
            description : req.body.description,
            img_url : imageURLParse,
            product_id : product.id,
            category_id : Number(req.body.cat_id)
        }, {transaction : t})

        if(productInfo){
            t.commit()
            res.json({product_id : product.id, product_name : product.name})
        }


    } catch (error) {
        t.rollback()
        console.log(error)
    }

}
const updateProduct = (req, res) =>{
    


}




module.exports = {
    getProducts,
    getProduct,
    getProductByCategory,
    getCategories,
    addProduct,
    getAllProducts
}



