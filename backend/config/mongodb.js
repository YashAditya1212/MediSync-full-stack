import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error("❌ ERROR: MONGODB_URI is not defined in .env file");
            console.log("📝 Please create a .env file in the backend folder with:");
            console.log("   MONGODB_URI=mongodb://localhost:27017");
            return;
        }

        mongoose.connection.on('connected', () => console.log("✅ Database Connected"))
        mongoose.connection.on('error', (err) => {
            console.error("❌ MongoDB connection error:", err.message);
            console.log("💡 Make sure MongoDB is running: mongod or net start MongoDB");
        });
        mongoose.connection.on('disconnected', () => console.log("⚠️  MongoDB disconnected"));

        // If MONGODB_URI already contains a database name (e.g. Atlas URI),
        // use it as-is. Otherwise, append the default database name.
        let connectionString = process.env.MONGODB_URI.trim()

        // Detect if a database part is already present after the host
        const uriWithoutParams = connectionString.split('?')[0]
        const afterHost = uriWithoutParams.split('//')[1]?.split('/')
        const hasDbName = afterHost && afterHost.length > 1 && afterHost[1] !== ''

        if (!hasDbName) {
            // For local URIs like mongodb://localhost:27017
            connectionString = `${connectionString.replace(/\/+$/,'')}/prescripto`
        }

        await mongoose.connect(connectionString)
        
        // Extract database name and host info for display
        const uriParts = connectionString.split('//')[1]?.split('/') || [];
        const dbName = uriParts[1]?.split('?')[0] || 'default';
        const host = process.env.MONGODB_URI.includes('mongodb.net') 
            ? 'MongoDB Atlas (Cloud)' 
            : process.env.MONGODB_URI.split('://')[1]?.split('/')[0] || 'Unknown'
        
        console.log(`✅ Connected to MongoDB database: ${dbName}`);
        console.log(`📍 MongoDB Host: ${host}`);
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        console.log("💡 Troubleshooting:");
        console.log("   1. Make sure MongoDB is installed and running");
        console.log("   2. Check MONGODB_URI in .env file");
        console.log("   3. Try: mongodb://127.0.0.1:27017");
    }
}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.