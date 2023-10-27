const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


const storage = multer.memoryStorage()

const upload = multer({storage : storage})


async function handleUpload(_file, _folder){
    try {
        const res  = await cloudinary.uploader.upload(_file, {
            resource_type: "image",
            folder : _folder
        })
        return res 
    } catch (error) {
        
       console.log(error.message)
       throw error
    }
} 

async function createFolder(folder_name) {
    try {
        const folder = await cloudinary.api.create_folder(`products/${folder_name}`)
        return folder
    } catch (error) {
        console.log(`Failed to create folder ${folder_name} error: ${error}`)
    }
}

module.exports = { handleUpload, upload, createFolder}
