import socketAuth from "../Middlewares/socketAuth.js";

export const socketHandler = (io) => {
    io.use(socketAuth);
    io.on("connection", (socket) => {
        console.log("socket connected: ", socket.userId);
        
        socket.join(socket.userId);

        socket.on("private_message", ({to, message}) => {
            if(!to || !message) return;
            io.to(Number(to)).emit("receive_message", {
                from: to,
                message,
                timeStamp: new Date()
            });
        });  
    })
}