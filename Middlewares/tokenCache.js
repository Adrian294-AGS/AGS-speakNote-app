import client from "../models/redisConnection.js";

export const tokenCache = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
        const result = await JSON.parse(client.get(`accessToken:${token}`));
        if(result != null){
            next();
        }
        return res.status(200).json({success: false, message: "Token expired"});
    } catch (error) {
        console.log(error);
    }
}