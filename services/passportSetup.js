import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from "dotenv";
import { selectUser, createUser } from "../models/sql.js";

dotenv.config({ path: "./.env" });

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientId,
      clientSecret: process.env.googleClientSecret,
      callbackURL: process.env.googleCallbackUrl,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // check if the email is already inserted
      console.log(refreshToken);
      try {
        const results = await selectUser(profile.id);
        if(results){
          return done(null, results);
        } else {
          const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          }
          const results = await createUser("tbluser", newUser);
          console.log(results);
          newUser.id = results.insertId;
          return done(null, newUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
