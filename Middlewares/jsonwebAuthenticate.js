import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

export const jwt_authenticate = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {return res.redirect("/")};
    try {
        jwt.verify(token, process.env.access_token, (error, User) => {
            if(error){return res.redirect("/refresh")};
            req.user = User;
            next();
        })
    } catch (error) {
        console.log(error)
    }
}