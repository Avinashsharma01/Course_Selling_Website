import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error(error);
    }
}

export default connectToDb