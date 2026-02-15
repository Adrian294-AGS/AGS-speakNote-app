import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function socketAuth  (socket, next)  {
    try {
        const token = socket.handshake.auth?.token;

        if(!token){
            return next("Authentication Error");
        }

        const decode = jwt.verify(token, process.env.access_token);
        socket.userId = decode.id;
        next();
    } catch (error) {
        
    }
}