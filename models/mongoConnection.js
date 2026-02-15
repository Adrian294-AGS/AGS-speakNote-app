import mongoose from "mongoose";

const db = mongoose.connection;

const mongo = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
    } catch (error) {
        console.log("MongoDb Error: ", error);
    }
};

export const test = db.collection("adrian");

export default mongo;
