import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { fetchUser } from "../models/sql.js";

dotenv.config({path: "./.env"});

export const jwt_authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {return res.status(401).json({success: false, message: "Access token expired"})};
    console.log(authHeader);
    console.log(token);
    try {
       const user = jwt.verify(token, process.env.access_token);
       req.user = user.id;
       next();
    } catch (error) {
        console.log(error)
    }
};