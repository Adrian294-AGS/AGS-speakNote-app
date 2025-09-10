import { error } from "console";
import { fetchUser } from "../models/sql.js";
import client from "../models/redisConnection.js";

export const fetchUserProfile = async (req, res) => {
  const { Id } = req.params;

  try {
    const userData = await fetchUser(Id);

    if (!userData.UID) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    return res.status(200).json({
      success: true,
      Id: userData.UID,
      username: userData.displayName,
      email: userData.email,
      photo: userData.photo,
      user_info: userData.user_info,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: `ERROR: ${error}` });
    console.log(error);
  }
};

export const getProfileInfo = async (req, res) => {
  client.connect();
  const { Id } = req.params;
  try {
    const user = await fetchUser(Id);
    if (!user.UID) throw error;
    return res
      .status(200)
      .json({ success: true, username: user.displayName, photo: user.photo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Server Error` });
  }
};
