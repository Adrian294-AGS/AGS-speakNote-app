import express from "express";
import {googleCallback, register, logout, logForm, refreshToken} from "../controller/authController.js";
import "../services/passportSetup.js";
import passport from "passport";
import { jwt_authenticate } from "../Middlewares/jsonwebAuthenticate.js";
import { fetchAudio, fetchTranscription, deleteAudio, copyText } from "../controller/audioController.js";
import { fetchUserProfile, getProfileInfo } from "../controller/userController.js";
import { cache } from "../Middlewares/redisCached.js";

const router = express.Router();

router.get("/protection", jwt_authenticate);

router.get("/getProfileInfo/:Id", cache, getProfileInfo);

router.get("/auth/refresh", refreshToken);

router.get("/auth/google", passport.authenticate('google',{scope:['profile','email']}));

router.get("/auth/google/callback", passport.authenticate('google',{session: false}), googleCallback);

router.post("/signIn", logForm);

router.post("/register", register);

router.get("/logout", logout);

router.get("/fetchUsers/:Id", fetchUserProfile);

router.get("/fetchAllAudio/:Id", fetchTranscription);

router.get("/fetchAudio/:Id", fetchAudio);

router.delete("/deleteAudio/:Id", deleteAudio);

router.get("/copyText/:Id", copyText);

export default router;
