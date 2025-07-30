import cloudinary from '../lib/cloudinary';


const entity: string = 'Upload';

export const UploadImageService = async (imagePath: string) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: 'flawless-brow'
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        return result;
    } catch (error) {
        throw new Error(`${entity} Error! Try uploading another image`);
    }

}