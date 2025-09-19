import passport from "passport";
import { Strategy as facebookStrategy } from "passport-facebook";
import dotenv from "dotenv";
import { selectFacebookId, createUser } from "../models/sql.js";

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
      const result = await selectFacebookId(profile.id);
      try {
        if (result) {
          return done(null, result);
        }
        const newUser = {
          faceBookId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
        };
        const insertUser = await createUser("tblusers", newUser);
        newUser.UID = insertUser.insertId;
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);
