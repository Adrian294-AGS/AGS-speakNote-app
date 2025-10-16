import { fetchUser, update } from "../models/sql.js";
import client from "../models/redisConnection.js";

export const fetchUserProfile = async (req, res) => {
  const { Id } = req.params;

  try {
    const userData = await fetchUser(Id);

    if (!userData) {
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
    console.log(error);
    return res.status(500).json({ success: false, message: `ERROR: ${error}` });
  }
};

export const getProfileInfo = async (req, res) => {
  const { Id } = req.params;
  try {
    const user = await fetchUser(Id);
    if (!user.UID) return res.status(404).json({success: false, messsage: "Id not found"});
    const userData = {
      username: user.displayName,
      photo: user.photo,
      user_info: user.user_info
    };

    client.setEx(`user:${Id}`, 3600, JSON.stringify(userData));
    return res
      .status(200)
      .json({ success: true, username: user.displayName, photo: user.photo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Server Error` });
  }
};

export const userUpdate = async (req, res) => {
  const {userInfo} = req.body;
  const { Id } = req.params;
  const photo = req.file;
  console.log(req.file);
  try {
    const set = {
      photo: photo.filename,
      user_info: userInfo
    }
    const result = await update("tblusers", set, Id);
    if(result.affectedRows){
      return res.status(200).json({success: true});
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
