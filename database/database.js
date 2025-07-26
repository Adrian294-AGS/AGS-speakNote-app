import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const db = mysql.createPool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  database: process.env.database,
}).promise();

export default db;
