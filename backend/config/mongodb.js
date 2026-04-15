import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/medisync"

        if (!mongoUri && !process.env.MONGO_URI && !process.env.MONGODB_URI) {
            console.warn("⚠️  WARNING: MONGO_URI is not defined. Using local fallback.");
        }

        mongoose.connection.on('connected', () => console.log("✅ Database Connected"))
        mongoose.connection.on('error', (err) => {
            console.error("❌ MongoDB connection error:", err.message);
            console.log("💡 Make sure MongoDB is running: mongod or net start MongoDB");
        });
        mongoose.connection.on('disconnected', () => console.log("⚠️  MongoDB disconnected"));

        // If the URI already contains a database name (e.g. Atlas URI),
        // use it as-is. Otherwise, append the default database name.
        let connectionString = mongoUri.trim()

        // Detect if a database part is already present after the host
        const uriWithoutParams = connectionString.split('?')[0]
        const afterHost = uriWithoutParams.split('//')[1]?.split('/')
        const hasDbName = afterHost && afterHost.length > 1 && afterHost[1] !== ''

        if (!hasDbName) {
            // Append a default database name when the URI only contains the host.
            connectionString = `${connectionString.replace(/\/+$/,'')}/prescripto`
        }

        await mongoose.connect(connectionString)
        
        // Extract database name and host info for display
        const uriParts = connectionString.split('//')[1]?.split('/') || [];
        const dbName = uriParts[1]?.split('?')[0] || 'default';
        const host = mongoUri.includes('mongodb.net') 
            ? 'MongoDB Atlas (Cloud)' 
            : mongoUri.split('://')[1]?.split('/')[0] || 'Unknown'
        
        console.log(`✅ Connected to MongoDB database: ${dbName}`);
        console.log(`📍 MongoDB Host: ${host}`);
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        console.log("💡 Troubleshooting:");
        console.log("   1. Make sure MongoDB is installed and running");
        console.log("   2. Check MONGO_URI in the environment");
    }
}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.
