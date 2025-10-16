import bcrypt from "bcryptjs";
import { selectUser, createUser } from "../models/sql.js";
import {
  generate_access_token,
  generate_refresh_token,
} from "../Middlewares/generateToken.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import client from "../models/redisConnection.js";
import { passwordStrength } from "check-password-strength";
import { photoMove } from "../Middlewares/photoMv.js";

dotenv.config();

//Google-oauth2 callBack
export const googleCallback = async (req, res) => {
  console.log(req.user);
  const payload = { id: req.user.UID, username: req.user.displayName };
  try {
    await photoMove(req.user.photo);
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

  const isPasswordValid = passwordStrength(password).value;

  if (username.length < 5) {
    return res
      .status(400)
      .json({ success: false, message: "Username is too short!!!!", data: "" });
  } else if (isPasswordValid == "Too weak") {
    return res.status(400).json({
      success: false,
      message: "Password is too weak!!!!",
      data: username,
    });
  }

  try {
    const selectResult = await selectUser(username);
    if (selectResult) {
      return res.status(400).json({
        success: false,
        message: `${username} is Already taken`,
        data: "",
      });
    }

    if (password != repeatPassword) {
      return res.status(400).json({
        success: false,
        message: "Password do not matched!!!!!",
        data: username,
      });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      displayName: username,
      password: hashedPassword,
    };
    const insertResult = await createUser("tblusers", newUser);
    console.log("Inserted success ID: ", insertResult.insertId);
    return res.status(201).json({
      success: true,
      message: "Success Sign-Up",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: `Error: ${error}` });
  }
};

//sign-in part
export const logForm = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Insert all field!!!" });
  }

  try {
    const result = await selectUser(username);
    if (result) {
      if (!result.password) {
        return res
          .status(200)
          .json({ success: false, message: "Sign-in with Google" });
      }
      let isMatched = await bcrypt.compare(password, result.password);
      if (!isMatched) {
        return res
          .status(401)
          .json({ success: false, message: "Wrong Password!!!!!" });
      }
      const payload = { id: result.UID, username: username };
      const access_token = generate_access_token(payload);
      const refresh_token = generate_refresh_token(payload);

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ access_token, success: true });
    } else {
      return res
        .status(400)
        .json({ success: false, message: `${username} is not Registered!!!` });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: `Backend Error: ${error}` });
    
  }
};

export const logout = async (req, res) => {
  const { Id } = req.params;

  try {
    await client.del(`user:${Id}`);
    res.clearCookie("refresh_token");
    return res
      .status(200)
      .json({ success: true, message: "successfully log-out" });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.refresh_token;

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid Refresh Token!!!" });
  }

  try {
    jwt.verify(token, process.env.refresh_token, async (error, user) => {
      if (error) {
        return res
          .status(500)
          .json({ success: false, message: "Token Expired" });
      }
      const payload = { id: user.id, username: user.username };
      const access_token = generate_access_token(payload);

      return res.status(200).json({ access_token, success: true });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something Went wrong!!!!" });
  }
};

export const facebookCallback = async (req, res) => {
  console.log(req.user);
  const payload = { id: req.user.UID, username: req.user.displayName };

  try {
    const access_token = generate_access_token(payload);
    const refresh_token = generate_refresh_token(payload);

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(301).redirect(`http://localhost:3000/?token=${access_token}`);
  } catch (error) {
    return res.status(500);
  }
};
