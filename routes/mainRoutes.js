import express from "express";
import {googleCallback, register, logout, logForm, refreshToken, facebookCallback} from "../controller/authController.js";
import "../services/passportSetup.js";
import passport from "passport";
import { jwt_authenticate } from "../Middlewares/jsonwebAuthenticate.js";
import { fetchAudio, fetchTranscription, deleteAudio, copyText } from "../controller/audioController.js";
import { fetchUserProfile, getProfileInfo, userUpdate } from "../controller/userController.js";
import { record } from "../controller/recordController.js";
import { cache } from "../Middlewares/redisCached.js";
import "../services/facebookAuth.js"
import uploadPhoto from "../Middlewares/multerPhoto.js"; 
import audioRecord from "../Middlewares/audioRecord.js";

const router = express.Router();

router.get("/protection", jwt_authenticate, cache, getProfileInfo);

router.get("/getProfileInfo/:Id", cache, getProfileInfo);

router.get("/auth/refresh", refreshToken);

router.get("/auth/google", passport.authenticate('google',{scope:['profile','email']}));

router.get("/auth/google/callback", passport.authenticate('google',{session: false}), googleCallback);

router.get("/auth/facebook", passport.authenticate('facebook',{scope:['email']}));

router.get("/auth/facebook/callback", passport.authenticate('facebook', {session: false}), facebookCallback);

router.post("/signIn", logForm);

router.post("/register", register);

router.get("/logout/:Id", logout);

router.get("/fetchUsers", jwt_authenticate, fetchUserProfile);

router.get("/fetchAllAudio", jwt_authenticate, fetchTranscription);

router.get("/fetchAudio/:Id", jwt_authenticate, fetchAudio);

router.delete("/deleteAudio/:Id", jwt_authenticate, deleteAudio);

router.get("/copyText/:Id", jwt_authenticate, copyText);

router.put("/update", uploadPhoto.single("photo"), jwt_authenticate, userUpdate);

router.post("/audioRecord", audioRecord.single("audio"), jwt_authenticate, record);

router.get("/fetchChatUser", jwt_authenticate, fetchChatUser);

export default router;
