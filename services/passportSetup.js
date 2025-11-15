import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from "dotenv";
import { SelectUserGoogle, createUser } from "../models/sql.js";
import { photoMove } from "../Middlewares/photoMv.js";

dotenv.config({ path: "./.env" });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientId,
      clientSecret: process.env.googleClientSecret,
      callbackURL: process.env.googleCallbackUrl,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        console.log(profile);
        const select_results = await SelectUserGoogle(profile.id);
        if (select_results) {
          return done(null, select_results);
        }
        const photo = await photoMove(profile.photos[0].value);
            console.log(photo);
        const newUser = {
          display_name: profile.displayName,
          email: profile.emails[0].value,
          photo: photo
        };
        const insert_results = await createUser("tbl_users", newUser);
        newUser.UID = insert_results.insertId;
        const userAccount = {
          UID: insert_results.insertId,
          provider: profile.provider,
          providerr_id: profile.id
        }
        await createUser("tbl_user_account", userAccount);
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);
