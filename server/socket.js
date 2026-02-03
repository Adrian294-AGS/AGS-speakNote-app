import socketAuth from "../Middlewares/socketAuth.js";

export const socketHandler = (io) => {
    io.use(socketAuth);

    io.on("connection", (socket) => {
        socket.join(socket.userId);

        socket.on("private_message", ({to, message}) => {
            if(!to || !message) return;
            console.log("socket message: ",message);
            io.to(to).emit("recieve_message", {
                from: to,
                message,
                timeStamp: new Date()
            })
        });

         socket.on("join", () => {
            socket.join(userId);
        })
       
    })
}