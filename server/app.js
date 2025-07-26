import express from "express";
import dotenv from "dotenv";
import router from "../routes/mainRoutes.js";
import fileUpload from "express-fileupload";
import db from "../database/database.js";
import passport from "passport";
import session from "express-session";
import connectMySQL from "express-mysql-session";

dotenv.config({ path: "./.env" });

const app = express();
const Port = process.env.port;
const MySQLStore = connectMySQL(session);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("upload"));
app.use(fileUpload());

app.set("view engine", "hbs");

const sessionStore = new MySQLStore({},db);

app.use(session({
  secret:process.env.sessionSecret,
  resave:false,
  saveUninitialized:true,
  store:sessionStore,
  cookie:{
    maxAge: 365 * 34 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.listen(Port, () => {
  console.log("server started at http://localhost:5000");
});
