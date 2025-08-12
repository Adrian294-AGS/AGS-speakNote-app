import express from "express";
import { login, googleCallback, success, register, signUp, logout, logForm, refreshToken} from "../controller/authController.js";
import "../services/passportSetup.js";
import passport from "passport";
import { jwt_authenticate } from "../Middlewares/jsonwebAuthenticate.js";

const router = express.Router();

router.get("/protection", jwt_authenticate);

router.get("/auth/refresh", refreshToken);

router.get("/home", jwt_authenticate, success);

router.get("/auth/google", passport.authenticate('google',{scope:['profile','email']}));

router.get("/auth/google/callback", passport.authenticate('google',{session: false, failureRedirect:"/"}), googleCallback);

router.post("/register", register);

router.post("/signIn", logForm);

router.get("/logout", logout);



export default router;
