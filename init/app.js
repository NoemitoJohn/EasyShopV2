const mysql = require('mysql')
const axios = require('axios')
const fs = require('fs');
const path = require('path');


const product_file_img = path.join(__dirname, '../', 'backend','product_img')

const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'easyshopv2',
});

connection.connect(function(err)  {
    
    if (err) {
        console.log(`Cant connect to database ${err.message}`)
        return
    }
    
    console.log('MySql Connected!');
});



init()

const createAsyncFolder = async function(index){
    return new Promise(function(resolve , reject){
        const distanation = path.join(product_file_img, String(index));
        
        fs.mkdir(distanation, function(err, p)  {
            if(err) {
                reject(err)
            }
            // if(err) throw err
            resolve(distanation)
            
        })
        
        
    })
    
}


function init(){
    
    console.log("START::")
    axios.get('https://dummyjson.com/products?limit=0').then(function(res) {
    
    const products = []
    const file = []
    
    res.data.products.forEach(async(product, index) =>{
        // for each index create dir 
        
        // distanation = await createAsyncFolder(index)
        createAsyncFolder(index).then(folder =>{
            products.push(createProduct(product, folder)) 
        })
    })
    
    
    
}).catch(err => {
    console.log(err.message)
    throw err
})
}

async function createProduct(product, distanation){
    
    return new Promise((resolve, reject) => {
        
        connection.beginTransaction(function(err){
            if(err) throw err
            
            connection.query('insert into products (name, price, stocks, rating) values(?,?,?,?)', [product.title, product.price, product.stock, product.rating], 
            
            function(err, result){
                if(err) throw err
                
                const now = Date.now();
                
                const productID = result.insertId;
                
                const img_url = []
                
                product.images.forEach((url, index) => {
                    img_url[index] = axios.get(url, {method: 'GET', responseType: 'stream'})
                });
                
                Promise.all(img_url).then( function(result){
                    
                    const img_data = []
                    
                    result.forEach((item, index) => {
                        
                        const file_name = path.join(distanation, `${now}-${index}.jpg`) ;
                        
                        img_data[index] = saveproductImg(file_name, item)
                    })
                    
                    Promise.all(img_data).then(data_result =>{
                        const img_json_array = []
                        
                        data_result.forEach((url, index) => {
                            img_json_array[index] = url
                        })
                        
                        const img_json = JSON.stringify(img_json_array)
                        
                        connection.query('insert into products_info(product_id, description, category, img_url) values(?,?,?,?)',[productID, product.description, product.category, img_json], 
                        
                        function(err, result){
                            if(err) throw err 
                            connection.commit(() =>{
                                resolve(`Product Created: ${product.title}`)
                                console.log("inserted")
                            })
                        })
                        
                    }).catch(err => {
                        throw err
                    })
                    
                }).catch(err =>{
                    throw err
                })
            })
        })
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

