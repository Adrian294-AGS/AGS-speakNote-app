import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

export const jwt_authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {return res.status(401).json({success: false, message: "Access token expired"})};
    try {
       const user = jwt.verify(token, process.env.access_token);
       req.user = user.id;
       next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Access Token expired"});
    }
};