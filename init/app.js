const mysql = require('mysql')
const axios = require('axios')
const fs = require('fs');
const path = require('path');

const DB = require('../backend/models/DB')


const product_file_img = path.join(__dirname, '../', 'backend', 'product_img')

const productImgFolder = async (file) =>{
    return new Promise((resolve, reject) =>{
        fs.access(file, (err) =>{
            if(err){
                fs.mkdir(file, () =>{
                    resolve(file)
                })
            }
        })
    })
}

const getAllCategories = async ()  => {
   
    const insertCat = async(cat) =>{
        return new Promise((resolve, reject) =>{
            
            const insert = async (cat_name) =>{
                const _category = await DB.Category.create({name : cat_name})
                return _category.name
            }
            
            const run = async(_cat) =>{
                const data =  await insert(_cat)
                resolve(data)
            }
            
            run(cat)
            
            
            // connection.query('insert into categories(name) values (?)', [cat], (err, result)=>{
            //     if(err) reject(err)
            //     resolve()
            // })
        })
    }

    const req = await axios.get('https://dummyjson.com/products/categories')

    for(let i = 0; i < req.data.length; i++){
        console.log(req.data[i])
        await insertCat(req.data[i])
    }
}

const createAsyncFolder = async function(parentFolder, index){
    return new Promise(function(resolve , reject){
        const distanation = path.join(parentFolder, String(index));
        
        fs.mkdir(distanation, function(err, p)  {
            if(err) {
                
            }
            resolve(distanation)
        })
        
        
    })
    
}

const getCat = async (cat) =>{
    
    return new Promise((resolve, reject) =>{
        const query = async (cat_name) =>{
            return await DB.Category.findOne({
                where : {
                    name : cat_name
                }
            })
            
        }

        const run = async(_cat_name) =>{
            try {
                const _cat = await query(_cat_name)
                resolve(_cat.id)
                
            } catch (error) {
                
            }
        }

        run(cat)

    })
}

const init = async() => {
    try {
        
        await DB.instance.sync({force : true})
        
        await getAllCategories()
        
        const parentForder = await productImgFolder(product_file_img)
        
        const child = await createChildFolder(parentForder)
        
    } catch (error) {
        throw error
    }
}



init()

async function createChildFolder(parentFolder){
 
    console.log("START::")
    axios.get('https://dummyjson.com/products?limit=0').then(function(res) {
    
    const createFolder = async () => {
        
        for(let i = 0; i < res.data.products.length; i++){
            try {
           
                const folder = await createAsyncFolder(parentFolder, i)
                
                console.log(`FOLDER CREATED ${folder}`)
                //res.data.products[i].category
                const cat_id = await getCat(res.data.products[i].category)
                
                const productCreated = await createProduct(res.data.products[i], folder , cat_id)
                
            } catch (error) {
                throw error
            }
        }
    }

    createFolder()
    

}).catch(err => {
    console.log(err.message)
    throw err
})
}

async function createProduct(product, distanation, cat_id){
    
    return new Promise((resolve, reject) => {
        const MAX_IMG = 5;
        
        const requestImg = async (url) =>{
            return new Promise(function (resolve) {
                    axios.get(url, {method: 'GET', responseType: 'stream'}).then((response) => resolve(response))
                    
            })
        }
        
        // const insertDB = async (inserted_id, product, count, data) =>{
        //     try {
                
        //         const downloadedJSON = await downloadImg(count, data)
        //         connection.query('insert into products_info(product_id, description, category_id, img_url) values(?,?,?,?)',[inserted_id, product.description, cat_id, downloadedJSON], 
                
        //         function(err, result){
        //             if(err) throw err 
        //             connection.commit(() =>{
        //                 console.log(`Created ${product.title}`)
        //                 resolve()
        //             })
        //         })
                
        //     } catch (error) {
        //         throw error
        //     }
        // }

        // const init_Img = async() =>{
        //     await insertDB(productID, product, img_count, product.images)
            
        // }
        
        // init_Img()

        const downloadImg = async (count, data, _img_name) => {
                    
            const img_json_array = []
            
            for(let i = 0; i < count ; i++){
                
                try {
                    
                    const req = await requestImg(data[i])
                    
                    const file_name = path.join(distanation, `${_img_name}-${i}.jpg`) ;
                    
                    const createFileImg = await saveproductImg(file_name, req)
                    
                    console.log(`IMAGE SAVE::: ${createFileImg}`)

                    img_json_array.push(createFileImg)
                
                } catch (error) {
                    throw error
                }
                
            }

            return JSON.stringify(img_json_array)
        }


        const insertProduct = async (_product, _cat_id) =>{
            
            const t = await DB.instance.transaction()

            try {
                
                const p =  await DB.Product.create({
                    name : _product.title,
                    price : _product.price,
                    stocks : _product.stock,
                    rating : _product.rating
                
                },{ transaction: t});

                const now = Date.now();

                let img_count = MAX_IMG
                
                if(_product.images.length < MAX_IMG) img_count = _product.images.length;


                // download img --
                const img_data_json = await downloadImg(img_count, _product.images, now)


                // insert product info and the img file url
                const p_info = await DB.ProductInfo.create({
                    description : _product.description,
                    categoryId : _cat_id,
                    productId : p.id,
                    img_url : img_data_json,
                }, {transaction : t})

                await t.commit()
                resolve()

            } catch (error) {
                await t.rollback()
                reject()
                throw error
            }
        }

        insertProduct(product, cat_id)

        // connection.beginTransaction(function(err){
        //     if(err) throw err
            
        //     connection.query('insert into products (name, price, stocks, rating) values(?,?,?,?)', [product.title, product.price, product.stock, product.rating], 
            
        //     function(err, result){
        //         if(err) throw err
                
                
                
              
                
                
                
                
               
        //     })
        // })
    })
}





async function saveproductImg(filename, response){
    
    const file_name = path.basename(filename)
    
    const dir_name = path.dirname(filename)
    
    const file = path.join(path.basename(dir_name),file_name)
    
    const writer = fs.createWriteStream(filename);
    
    response.data.pipe(writer)
    
    return new Promise((resolve, reject) =>{
        writer.on('finish', function(){
            resolve(file)
        })
        
        writer.on('error', function(err){
            if(err){
                reject(err)
            } 
        })
        
    })
    
    
}

