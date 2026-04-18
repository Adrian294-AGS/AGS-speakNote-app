import message from "../models/message.js";

export const socketHandler = (io, socket) => {
    socket.on("user:connect", ({userId}) => {
        socket.userId = userId;
        socket.join(`user:${userId}`);
        console.log(`socket connected: user:${userId}`);
    });

    socket.on("conversation:join", ({conversationId}) => {
        socket.join(`conv:${conversationId}`);
    });

    socket.on("message:send", async ({ conversationId, text}) => {
        try {
           const [ result ] =  await message.create({
                conversationId,
                senderId: socket.userId,
                text,
                sendAt: Date.now()
            });
            io.to(`conv:${conversationId}`).emit("message:new", {
                Message: result.text,
            });

        } catch (error) {
            console.log(error);
        }
    })
}