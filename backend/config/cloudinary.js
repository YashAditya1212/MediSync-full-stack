import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    try {
        // Cloudinary is optional - only configure if credentials are provided
        if (process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_SECRET_KEY) {
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_SECRET_KEY
            });
            console.log("✅ Cloudinary configured");
        } else {
            console.log("⚠️  Cloudinary not configured (optional - image uploads will not work)");
        }
    } catch (error) {
        console.error("❌ Cloudinary configuration error:", error.message);
        console.log("💡 Cloudinary is optional - the server will continue without it");
    }
}

export default connectCloudinary;