import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI ;
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        const connection = await mongoose.connect(MONGO_URI);
        Log.info(`Connected to MongoDB ${connection.connection.name}`);

    } catch (error) {
        Log.error('[DATABASE CONNECTION ERROR]', error);
    }
}

export default connectDB;
