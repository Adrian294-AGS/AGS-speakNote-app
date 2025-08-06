import bcrypt from "bcryptjs";
import { selectUser, createUser, selectUserForAudio } from "../models/sql.js";
import {
  generate_access_token,
  generate_refresh_token,
} from "../Middlewares/generateToken.js";

export const login = (req, res) => {
  res.render("login");
};

export const signUp = (req, res) => {
  res.render("register");
};

//Register using Google-oauth2
export const googleCallback = (req, res) => {
  console.log(req.user);
  const payload = { id: req.user.Id, username: req.user.displayName };
  try {
    const access_token = generate_access_token(payload);
    const refresh_token = generate_refresh_token(payload);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

export const success = async (req, res) => {
  const user = req.user;
  try {
    const select_results = await selectUserForAudio(user.id);
    return res.render("Home", {profile: select_results});
  } catch (error) {
    console.log(error);
    return res.render("login", {msg: "Something went wrong try again"});
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

  try {
    const result = await selectUser(username);
    if (result) {
      let isMatched = await bcrypt.compare(password, result.password);
      if (!isMatched) {
        return res.render("login", {
        msg: "Password do not matched!!!!!",
        username: result.displayName
        });
      }

      const payload = {id: result.Id, username: username};
      const access_token = generate_access_token(payload);
      const refresh_token = generate_refresh_token(payload);

      res.cookie("access_token", access_token, {httpOnly: true, maxAge: 15 * 60 * 1000});
      res.cookie("refresh_token", refresh_token, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000});

      return res.redirect("/home");
    }
    return res.render("login", { msg: `${username} is not registered !!!!` });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  return res.redirect("/");
};
