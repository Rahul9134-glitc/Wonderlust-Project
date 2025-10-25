import cloudinary from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import dotenv from "dotenv"

dotenv.config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'WanderLust_DEV',
        allowedFormats: ['jpeg', 'png', 'jpg'],
        transformation: [
            { width: 800, crop: "scale" }
        ]
    },
});


const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'WanderLust_PROFILES',
        allowedFormats: ['jpeg', 'png', 'jpg'],
        transformation: [
            { width: 300, height: 300, crop: "fill", gravity: "face" } 
        ]
    },
});


export {cloudinary , storage , profileStorage}