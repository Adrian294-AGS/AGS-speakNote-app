import redis from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisPort = process.env.Redis_port || 6379;
const client = redis.createClient(redisPort);

export default client;
