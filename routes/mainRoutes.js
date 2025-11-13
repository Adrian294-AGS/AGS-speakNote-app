import express from "express";
import {googleCallback, register, logout, logForm, refreshToken, facebookCallback} from "../controller/authController.js";
import "../services/passportSetup.js";
import passport from "passport";
import { jwt_authenticate } from "../Middlewares/jsonwebAuthenticate.js";
import { fetchAudio, fetchTranscription, deleteAudio, copyText } from "../controller/audioController.js";
import { fetchUserProfile, getProfileInfo, userUpdate } from "../controller/userController.js";
import { cache } from "../Middlewares/redisCached.js";
import "../services/facebookAuth.js"
import uploadPhoto from "../Middlewares/multerPhoto.js";
import { tokenCache } from "../Middlewares/tokenCache.js"; 

const router = express.Router();

router.get("/protection", tokenCache, jwt_authenticate);

router.get("/getProfileInfo/:Id", cache, getProfileInfo);

router.get("/auth/refresh", refreshToken);

router.get("/auth/google", passport.authenticate('google',{scope:['profile','email']}));

router.get("/auth/google/callback", passport.authenticate('google',{session: false}), googleCallback);

router.get("/auth/facebook", passport.authenticate('facebook',{scope:['email']}));

router.get("/auth/facebook/callback", passport.authenticate('facebook', {session: false}), facebookCallback);

router.post("/signIn", logForm);

router.post("/register", register);

router.get("/logout/:Id", logout);

router.get("/fetchUsers/:Id", fetchUserProfile);

router.get("/fetchAllAudio/:Id", fetchTranscription);

router.get("/fetchAudio/:Id", fetchAudio);

router.delete("/deleteAudio/:Id", deleteAudio);

router.get("/copyText/:Id", copyText);

router.put("/update/:Id", uploadPhoto.single("photo"), userUpdate);

export default router;
