import client from "../models/redisConnection.js";

export const tokenCache = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
        const result = await client.get(`accessToken:${token}`);
        if(result != null){
            req.user = result;
            next();
        }
        return res.status(200).json({success: false, message: "Token expired"});
    } catch (error) {
        console.log(error);
    }
}