import express from "express";
import { login, googleCallback, success, register, signUp, addInfoSignUp, logout, logForm } from "../controller/authController.js";
import "../services/passportSetup.js";
import passport from "passport";
import { isLoggedIn } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", login);

router.get("/signUp", signUp);

router.get("/success", isLoggedIn, success);

router.get("/auth/google", passport.authenticate('google',{scope:['profile','email']}));

router.get("/auth/google/callback", passport.authenticate('google',{failureRedirect:"/"}), googleCallback);

router.post("/register", register);

router.post("/addInfoSignUp", addInfoSignUp);

router.post("/signIn/home", logForm);

router.get("/logout", logout);

export default router;
