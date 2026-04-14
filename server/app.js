import express from "express";
import dotenv from "dotenv";
import router from "../routes/mainRoutes.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import subRouter from "../routes/subRoutes.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDb } from "../database/mongoConnection.js";
import socketHandler from "../services/chatSocket.js";

dotenv.config({ path: "./.env" });

const app = express();
const server = http.createServer(app);

const Port = process.env.port;

app.use(express.json());
app.use(express.static("upload"));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://192.168.100.90:3000", "http://localhost:3000"],
    credentials: true,
  }),
);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socketHandler(io, socket);
});

app.use(passport.initialize());

app.use("/", router);
app.use("/home", subRouter);

connectDb().then(() => {
  server.listen(Port, () => {
    console.log("server started at http://localhost:5000");
  });
});
