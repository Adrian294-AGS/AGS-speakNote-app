import passport from "passport";
import { Strategy as facebookStrategy } from "passport-facebook";
import dotenv from "dotenv";
import { selectFacebookId, createUser } from "../models/sql.js";
import { photoMove } from "../Middlewares/photoMv.js";

dotenv.config();

passport.use(
  new facebookStrategy(
    {
      clientID: process.env.facebookId,
      clientSecret: process.env.facebookSecret,
      callbackURL: process.env.facebookCallbackUrl,
      profileFields: ["id", "displayName", "photos", "email"],
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const result = await selectFacebookId(profile.id);
        if (result) {
          return done(null, result);
        }
        const photo_path = await photoMove(profile.photos[0].value);
        const newUser = {
          display_name: profile.displayName,
          email: profile.emails[0].value,
          photo: photo_path
        };
        const insertUser = await createUser("tbl_users", newUser);
        newUser.UID = insertUser.insertId;
        const userAccount = {
          UID: insertUser.insertId,
          provider: "facebook",
          providerr_id: profile.id
        }
        await createUser("tbl_user_account", userAccount);
        const userInfo = {
          UID: insertUser.insertId,
          userInfo: "Insert Info"
        };
        await createUser("tbl_user_info", userInfo);
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);
