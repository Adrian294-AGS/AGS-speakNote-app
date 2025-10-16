import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from "dotenv";
import { SelectUserGoogle, createUser } from "../models/sql.js";

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
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
        };
        const insert_results = await createUser("tblusers", newUser);
        newUser.UID = insert_results.insertId;
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);
