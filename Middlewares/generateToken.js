import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

export const generate_access_token = (user) => {
    return jwt.sign(user, process.env.access_token, {expiresIn: "15m"});
}

export const generate_refresh_token = (user) => {
    return jwt.sign(user, process.env.refresh_token, {expiresIn: "7d"});
}