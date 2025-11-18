import client from "../models/redisConnection.js";

export const tokenCache = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
        const result = await client.get(`accessToken:${token}`);
        const data = result;
        console.log(data);
        if(data !== null){
            req.user = data;
            return next();
        }
        return res.status(200).json({success: false, message: "Token expired11111"});
    } catch (error) {
        console.log(error);
    }
}