export const socketHandler = (io) => {
    console.log("dumman dito");
    io.on("connection", (socket) => {
        console.log("socket connected");
        socket.on("join", (data) => {
            socket.join(data);
        });

        socket.on("private_message", ({to, message}) => {
            if(!to || !message) return;
            console.log("socket message: ",message);
            socket.to(to).emit("recieve_message", {
                from: to,
                message,
                timeStamp: new Date()
            });
        });  
    })
}