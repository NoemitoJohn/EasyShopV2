const DB = require('../models/DB')
const {Op , QueryTypes} = require('sequelize')
const {handleUpload, createFolder} = require('../middleware/uploader')
const validator = require('validator').default

const getAllProducts = async (req, res) => {
    try {
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
    
        res.status(200).json({total : count, products : rows})
    } catch (error) {
        res.status(500).send()
    }
    
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

    res.json(products)
}

const getProduct = async (req, res) =>{
    let id;
    
    if(req.params) id = Number(req.params.id);

    try {
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
        
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).send()
        
    }
    
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
const updateProduct = async (req, res) =>{
    // TODO: check if admin
    if(!req.admin) return req.status(403).send('Restricted')
    // TODO: validation 

    const t = await DB.instance.transaction()
    
    try {
        
        await DB.Product.update({
            name : req.body.name,
            price : req.body.price,
        },{
            where: {id : req.body.id},
            transaction : t
        })

        await DB.ProductInfo.update({
            description :  req.body.description
        },{
            where : { product_id : req.body.id},
            transaction : t
        })

        t.commit()

        const product = await DB.ProductInfo.findOne({
            
            attributes : ['description', 'img_url',], 
            
            where : {
                product_id : req.body.id
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

        if(product) res.status(200).json(product)
        
    } catch (error) {
        console.log(error)
        t.rollback()
        res.status(500).send()
    }
}

const updateCategory = async (req, res) => {
    //TODO: if admin only
    if(!req.body.cat || !req.body.id || validator.isEmpty(req.body.cat, {ignore_whitespace: true})) return res.status(400).send('Fields cannot be empty')
    try{
        const update = await DB.Category.update({name: req.body.cat}, {where : { id : req.body.id}})
        if(update)
            res.status(200).send()
    }catch(error) {
        console.log(error)
    }



}

const addCategory = async (req, res) => {
    //TODO: if admin only
    // return console.log(req.body.cat)

    if(!req.body.cat || validator.isEmpty(req.body.cat, {ignore_whitespace: true})) return res.status(400).send('Fields cannot be empty')

    try {
        const [cat, created] = await DB.Category.findOrCreate({
            where : {
                name: {
                    [Op.like] : req.body.cat
                }
            },
            defaults : {
                name : req.body.cat
            }

        })
        if(created){
            return res.status(200).send(cat)
        }else {

            return res.status(400).send(`${req.body.cat} already exist`)
        }
        

    } catch (error) {
        console.log(error)
    }
}

const updateStocks = async (req, res) =>{
    //TODO: if admin only
    if(!req.body.id || req.body.quantity <= 0) return res.status(400).send()
    
    try {
        const product = await DB.Product.findOne({
            where : { id : req.body.id },
            attributes: [],
            include: [{
                model : DB.Inventory
            }]
        })
        const val = (product.inventory.in + Number(req.body.quantity))
        await DB.Inventory.update({in : val},
            {
                where : {
                    id : product.inventory.id
                }
            })

        res.status(200).json({current : val - product.inventory.out})
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    addCategory,
    getProducts,
    getProduct,
    getProductByCategory,
    getCategories,
    addProduct,
    getAllProducts,
    updateProduct,
    updateCategory,
    updateStocks,
}



