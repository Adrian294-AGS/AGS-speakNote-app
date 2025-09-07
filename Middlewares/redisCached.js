import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisPort = process.env.Redis_port || 6379;

const client = redis.createClient(redisPort);

export const cache = async (req, res, next) => {
    const {Id} = req.params;

    try {
        const cached = await client.get(Id);
        if(data != null){
            return res.status(200).json({success: true, data: cached});
        }
    } catch (error) {
        console.log(error);
        next();
    }
}



