import socketAuth from "../Middlewares/socketAuth.js";

export const socketHandler = async (io) => {
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