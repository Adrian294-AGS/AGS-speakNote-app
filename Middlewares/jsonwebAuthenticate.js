import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

export const jwt_authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) {return res.status(500).json({success: false, message: "Access Token expired!!!"})};
    try {
        jwt.verify(token, process.env.access_token, (error, User) => {
            if(error){return res.redirect("/refresh")};
            let data = User;
            res.status(200).json({success: true, Id: data.id, username: data.username});
            next();
        })
    } catch (error) {
        console.log(error)
    }
}