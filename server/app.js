import express from "express";
import dotenv from "dotenv";
import router from "../routes/mainRoutes.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import uploadRouter from "../routes/uploadRoutes.js";

dotenv.config({ path: "./.env" });

const app = express();
const Port = process.env.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("upload"));
app.use(cookieParser());

app.set("view engine", "hbs");

app.use(passport.initialize());

app.use("/", router);
app.use("/home", uploadRouter);

app.listen(Port, () => {
  console.log("server started at http://localhost:5000");
});
