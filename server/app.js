import express from "express";
import dotenv from "dotenv";
import router from "../routes/mainRoutes.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import subRouter from "../routes/subRoutes.js";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();
const Port = process.env.port;

app.use(express.json());
app.use(express.static("public"));
app.use(express.static("upload"));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(passport.initialize());

app.use("/", router);
app.use("/home", subRouter);

app.listen(Port, () => {
  console.log("server started at http://localhost:5000");
});
