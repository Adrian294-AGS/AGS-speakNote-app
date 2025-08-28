import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { selectUserForAudio } from "../models/sql.js";

dotenv.config({path: "./.env"});

export const jwt_authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) {return res.status(500).json({success: false, message: "Access token expired"})};
    try {
        jwt.verify(token, process.env.access_token, async (error, User) => {
            if(error){return console.log(error)};
            const data = await selectUserForAudio(User.id);
            if(!data.photo){
                return  res.status(200).json({success: true, Id: data.Id, username: data.displayName, photo: null});
            }
            res.status(200).json({success: true, Id: data.Id, username: data.displayName, photo: data.photo});
            next();
        })
    } catch (error) {
        console.log(error)
    }
}