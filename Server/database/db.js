// database/db.js
import mongoose from 'mongoose';

const connectDB = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI); // ✅ simplified
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
