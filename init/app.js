const cloudinary = require('cloudinary').v2
const DB = require('../backend/models/DB');
const axios = require('axios')
      
cloudinary.config({ 
  cloud_name: 'dbydjphan', 
  api_key: '916138937566699', 
  api_secret: 'KxX9hhkKRhEXFDyge_OkpVUJOTs' 
});



const createProduct = async () =>{
 
    const MAX_IMG = 5;
 
    const products = await axios.get('https://dummyjson.com/products?limit=0')
    //insert the product into the database and get the id 
    for (const item of products.data.products) {
        
        try {
            
            const product = await DB.Product.create({name : item.title, price : item.price, rating : item.rating, stocks : item.stock})
            
            console.log(`Inserted product ${product.name}`)
            const subFolder = await cloudinary.api.create_folder(`products/${product.id}`)
            console.log(`Created Sub-folder`)
            
            const imagesURL = []

            let imgCount = MAX_IMG

            if(item.images.length < MAX_IMG) imgCount = item.images.length;
            
            console.log(`Total images ::: [${imgCount}]`)
            
            for(let i = 0; i < imgCount; i++){
                
                const img = await cloudinary.uploader.upload(item.images[i], { folder: subFolder.path});
                console.log(`Uploaded image [${i + 1}] ::: ${img.secure_url}`)
                imagesURL.push(img.secure_url) 
            }

            const category = await DB.Category.findOne({
                where : {
                    name : item.category
                }
            })

            const productInfo = await DB.ProductInfo.create({
                description: item.description,
                category_id : category.id,
                product_id : product.id,
                img_url : JSON.stringify(imagesURL)
            })

            console.log(`DONE::: ${product.name} Uploaded`)
            
        } catch (error) {
            throw error
        }    
    }
}

const insertCategory  = async () =>{
    try {
        
        const req =  await axios.get('https://dummyjson.com/products/categories')
        for (const category of req.data) {
            const cat = await DB.Category.create({name : category})
            console.log(`INSERTED CAT ::: [${cat.name}]`)
        }

    } catch (error) {
        throw error
    }
    
    // 
}

async function init(){
    await DB.instance.sync({force: true})
    await insertCategory()
    await createProduct()
} 


// init()