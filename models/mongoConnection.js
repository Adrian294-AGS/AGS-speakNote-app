import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

await client.connect();
const db = client.db("myapp");

export default db;

