import bcrypt from "bcryptjs";
import { SelectUserNoGoogle, createUser } from "../dbQuerys/sql.js";

export const login = (req, res) => {
  res.render("login");
};

export const signUp = (req, res) => {
  res.render("register");
};

//Register using Google-oauth2
export const googleCallback = (req, res) => {
  res.redirect("/success");
};

export const success = (req, res) => {
  console.log(req.user);
  const user = req.user;

  if (user.createdAt) {
    return res.render("login", {
      msg: `${user.email} is Already Registered!!!!`,
    });
  } else {
    return res.render("additionalSignUpInfo", { profile: user });
  }
};

export const addInfoSignUp = async (req, res) => {
  const { email, password, username, repeatPassword, photo } = req.body;

  const user = {
    email: email,
    displayName: username,
  };

  try {
    const selectResult = await SelectUserNoGoogle(email);
    if (selectResult) {
      return res.render("additionalSignUpInfo", {
        msg: "This Account is Already Created",
        profile: user,
      });
    } else {
      if (password !== repeatPassword) {
        return res.render("additionalSignUpInfo", {
          msg: "Password do not matched!!!!",
          profile: user,
        });
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      const newUser = {
        email: email,
        username: username,
        password: hashedPassword,
        photo: photo,
      };
      const insertResult = await createUser("tblNoGoogleUser", newUser);
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    return res.render("additionalSignUpInfo", {
      msg: "Something went wrong. Please try again.",
      profile: user,
    });
  }
};

//Register Without APIs

export const register = async (req, res) => {
  const { email, username, password, repeatPassword } = req.body;

  try {
    const selectResult = await SelectUserNoGoogle(email);
    if (selectResult) {
      return res.render("register", {
        msg: `${email} is All ready created`,
      });
    } else {
      const user = {
        email: email,
        username: username,
      };
      if (password != repeatPassword) {
        return res.render("register", {
          msg: "Password do not match",
          profile: user,
        });
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      const newUser = {
        email: email,
        password: hashedPassword,
        username: username,
      };
      const insertResult = await createUser("tblNoGoogleUser", newUser);
      console.log("Inserted success ID: ", insertResult.insertId);
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

//sign-in part
export const logForm = async (req, res) => {

  const { email, password } = req.body;

  try {
    const result = await SelectUserNoGoogle(email);
    if(result){
      let isMatched = await bcrypt.compare(password, result.password);
      if(isMatched){
        return res.render("Home", {profile: result});
      }
      return res.render("login", {msg: "Password do not matched!!!!!", email: result});
    }
    return res.render("login", { msg: `${email} is not registered`});
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  req.logOut((error) => {
    if (error) {
      return next(error);
    }
    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }
      return res.redirect("/");
    });
  });
};
