import socketAuth from "../Middlewares/socketAuth.js";
import mongo from "../models/mongoConnection.js";
import { test } from "../models/mongoConnection.js";


export const socketHandler = async (io) => {
    await mongo();
    io.use(socketAuth);
    io.on("connection", (socket) => {
        const user = socket.userId;
        console.log("socket connected: ", user);
        socket.join(user);
        socket.on("private_message", async ({to, message}) => {
            if(!to || !message) return;
        
            io.to(Number(to)).emit("receive_message", {
                from: to,
                message,
                timeStamp: new Date()
            });
        });  
    })
}