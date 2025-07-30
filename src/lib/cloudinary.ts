import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_NAME;
const apiKey = process.env.CLOUDINARY_KEY;
const apiSecret = process.env.CLOUDINARY_SECRET;

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
});


export default cloudinary;