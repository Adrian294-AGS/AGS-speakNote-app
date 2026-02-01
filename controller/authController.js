import bcrypt from "bcryptjs";
import { verifyUser, createUser, loginUser, fetchUser } from "../models/sql.js";
import {
  generate_access_token,
  generate_refresh_token,
} from "../services/generateToken.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import client from "../models/redisConnection.js";
import { passwordStrength } from "check-password-strength";

dotenv.config();

//Google-oauth2 callBack
export const googleCallback = async (req, res) => {
  console.log(req.user);
  const payload = { id: req.user.UID, username: req.user.display_name };
  try {
    const access_token = generate_access_token(payload);
    const refresh_token = generate_refresh_token(payload);

    console.log("refresh token in payload: ", refresh_token);

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      sameSite: "lax", // REQUIRED for OAuth redirect
      secure: false, // MUST be false on http
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: "192.168.100.90"
    });

    return res
      .status(302)
      .redirect(`http://localhost:3000/?token=${access_token}`);
  } catch (error) {
    console.log(error);
  }
};

// Register Without Google oauth2 APIs

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
    const selectResult = await verifyUser(username);
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
      display_name: username,
      password: hashedPassword,
    };
    const insertResult = await createUser("tbl_users", newUser);
    const userInfo = {
      UID: insertResult.insertId,
      userInfo: "Insert Info",
    };
    const insertInfo = await createUser("tbl_user_info", userInfo);
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
    const result = await loginUser(username);

    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Account dos not exist" });
    } else if (result.provider == "google") {
      return res
        .status(204)
        .json({ success: false, message: "Continue with Google." });
    } else if (result.provider == "facebook") {
      return res
        .status(204)
        .json({ success: false, message: "Continue with Facebook" });
    }

    if (result.display_name) {
      let isMatched = await bcrypt.compare(password, result.password);
      if (!isMatched) {
        return res
          .status(401)
          .json({ success: false, message: "Wrong Password!!!!!" });
      }
      const userInfo = await fetchUser(result.UID);
      const payload = { id: result.UID, username: username };
      const access_token = generate_access_token(payload);
      const refresh_token = generate_refresh_token(payload);

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      await client.setEx(`user:${result.UID}`, 3600, JSON.stringify(userInfo));

      return res.status(200).json({ access_token, success: true });
    } else {
      return res
        .status(400)
        .json({ success: false, message: `${username} is not Registered!!!` });
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

// Log-out part
export const logout = async (req, res) => {
  const { Id } = req.params;
  console.log(Id);
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

// Refresh token
export const refreshToken = async (req, res) => {
  const token = req.cookies.refresh_token;
  console.log("refresh token in function: ", token);

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

      return res.status(200).json({ success: true, access_token });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something Went wrong!!!!" });
  }
};

//Facebook-oauth2

export const facebookCallback = async (req, res) => {
  console.log(req.user);
  const payload = { id: req.user.UID, username: req.user.display_name };

  try {
    const access_token = generate_access_token(payload);
    const refresh_token = generate_refresh_token(payload);

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(301)
      .redirect(`http://localhost:3000/?token=${access_token}`);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
