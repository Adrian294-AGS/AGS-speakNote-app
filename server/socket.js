import socketAuth from "../Middlewares/socketAuth.js";
import db from "../models/mongoConnection.js";
export const socketHandler = async (io) => {
    io.use(socketAuth);
    io.on("connection", (socket) => {
        const user = socket.userId;
        console.log("socket connected: ", user);
        socket.join(user);
        socket.on("private_message", async ({to, message}) => {
            if(!to || !message) return;
            await db.collection("user").insertOne({to: to, message: message});
            io.to(Number(to)).emit("receive_message", {
                from: to,
                message,
                timeStamp: new Date()
            });
        });  
    })
}