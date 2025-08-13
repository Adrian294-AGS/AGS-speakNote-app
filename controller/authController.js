import bcrypt from "bcryptjs";
import { selectUser, createUser, selectUserForAudio } from "../models/sql.js";
import {
  generate_access_token,
  generate_refresh_token,
} from "../Middlewares/generateToken.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const login = (req, res) => {
  res.render("login");
};

export const signUp = (req, res) => {
  res.render("register");
};

//Google-oauth2 callBack
export const googleCallback = (req, res) => {
  console.log(req.user);
  const payload = { id: req.user.Id, username: req.user.displayName };
  try {
    const access_token = generate_access_token(payload);
    const refresh_token = generate_refresh_token(payload);

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(`http://localhost:3000/?token=${access_token}`);
  } catch (error) {
    console.log(error);
  }
};

//Register Without Google oauth2 APIs

export const register = async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  if(username.length < 5) return res.render("register", {msg: "username is too short"});

  try {
    const selectResult = await selectUser(username);
    if (selectResult) {
      return res.render("register", {
        msg: `${username} is All ready created`,
      });
    }
    const user = {
      username: username,
    };
    if (password != repeatPassword) {
      return res.render("register", {
        msg: "Password do not match",
        profile: user,
      });
    } else if (password.length < 5) {
      return res.render("register", {
        msg: "Password is too short!!!!",
        profile: user,
      });
    }
    let hashedPassword = await bcrypt.hash(password, 8);
    const newUser = {
      displayName: username,
      password: hashedPassword,
    };
    const insertResult = await createUser("tblusers", newUser);
    console.log("Inserted success ID: ", insertResult.insertId);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

//sign-in part
export const logForm = async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password) {
    return res.status(500).json({success: false, message: "Insert all field!!!"});
  }

  try {
    const result = await selectUser(username);
    if(result.password == null){
      return res.status(500).json({success: false, message: "Sign-in with Google"});
    } else if (result) {
      let isMatched = await bcrypt.compare(password, result.password);
      if (!isMatched) {
        return res.status(500).json({success: false, message: "Password do not matched!!!"});
      }

      const payload = {id: result.Id, username: username};
      const access_token = generate_access_token(payload);
      const refresh_token = generate_refresh_token(payload);

      res.cookie("refresh_token", refresh_token, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000});

      return res.status(200).json({access_token, success: true});
    }
    return res.status(500).json({success: false, message: `${username} is not Registered!!!`});
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("refresh_token");
  return res.status(200).json({success: true, message: "successfully log-out"});
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.refresh_token;

  if(!token){
    return res.status(500).json({success: false, message: "Invalid Refresh Token!!!"});
  }

  try {
    jwt.verify(token, process.env.refresh_token, async (error, user) => {
      if(error){return res.status(500).json({success: false, message: "Token Expired"})};
      const payload = {id: user.id, username: user.username};
      const access_token = generate_access_token(payload);

      return res.status(200).json({access_token, success: true});
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "Something Went wrong!!!!"});
  }
}
