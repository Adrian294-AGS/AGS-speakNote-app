import bcrypt from "bcryptjs";
import { SelectUserNoGoogle } from "../dbQuerys/sql.js";

//sign-in part
export const logForm = async (req, res) => {

  const { email, password } = req.body;

  try {
    const result = await SelectUserNoGoogle(email);
    if(result){
      let isMatched = await bcrypt.compare(password, result.password);
      if(isMatched){
        return res.render("success", {profile: result});
      }
      return res.render("login", {msg: "Password do not matched!!!!!", email: result});
    }
    return res.render("login", { msg: `${email} is not registered`});
  } catch (error) {
    console.log(error);
  }
};
