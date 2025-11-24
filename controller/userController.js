import { fetchUser, update } from "../models/sql.js";
import client from "../models/redisConnection.js";

export const fetchUserProfile = async (req, res) => {
  const Id = req.user;

  try {
    const userData = await fetchUser(Id);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    return res.status(200).json({
      success: true,
      userData
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `ERROR: ${error}` });
  }
};
/////////////////////// dito ako nag tapos
export const getProfileInfo = async (req, res) => {
  const UID = req.user;
  try {
    console.log("dumaan ulit dito");
    const user = await fetchUser(UID);
    if (!user){
      return res.status(404).json({ success: false, messsage: "Id not found" });
    }
    const userData = {
      username: user.displayName,
      photo: user.photo,
      user_info: user.userInfo
    };

    client.setEx(`user:${UID}`, 3600, JSON.stringify(userData));
    return res
      .status(200)
      .json({ success: true, Id: UID, username: user.displayName, photo: user.photo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Server Error` });
  }
};

export const userUpdate = async (req, res) => {
  const { userInfo } = req.body;
  const { Id } = req.params;
  const UID = req.user
  const photo = req.file || null;
  let set;

  try {
    if (!photo) {
      set = { user_info: userInfo };
      const result = await update("tbl_user_info", set, Id);
      if (result.affectedRows) {
        const user = await fetchUser(Id);
        const newUser = {
          username: user.displayName,
          photo: user.photo,
          user_info: user.user_info,
        }
        await client.del(`user:${Id}`);
        await client.setEx(`user:${Id}`, 3600, JSON.stringify(newUser));
        return res.status(200).json({ success: true });
      }
    } else {
      set = { photo: photo.filename, user_info: userInfo };
      const result = await update("tblusers", set, Id);
      if (result.affectedRows) {
        await client.del(`user:${Id}`);
        return res.status(200).json({ success: true });
      }
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
