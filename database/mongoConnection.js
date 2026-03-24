import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.mongodbUri, {
            dbName: "myapp"
        });
        console.log("mongoDb Connected........")
    } catch (error) {
        console.log("mongodb ERROR: ", error);
    }
};
