import { fetchUser, update, selectUserInfo } from "../models/sql.js";
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
    client.setEx(`user:${UID}`, 3600, JSON.stringify(user));
    return res
      .status(200)
      .json({ success: true, Id: UID, username: user.displayName, photo: user.photo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Server Error` });
  }
};

export const userUpdate = async (req, res) => {
  const { Info } = req.body;
  const UID = req.user
  const photo = req.file || null;

  try {
    const userInfoId = await selectUserInfo(UID);
    if (!photo) {
      let set = { userInfo: Info };
      const result = await update("tbl_user_info", set, userInfoId.info_id);
      if (result.affectedRows) {
        const user = await fetchUser(Id);
        await client.del(`user:${UID}`);
        await client.setEx(`user:${UID}`, 3600, JSON.stringify(user));
        return res.status(200).json({ success: true });
      }
    } else {
      let set1 = { 
        photo: photo.filename
      };
      let set2 = {
        userInfo: Info
      };
      const insertPhoto = await update("tbl_users", set1, UID);
      const insertUserInfo = await update("tbl_user_info", set2, userInfoId.info_id);
      if(insertUserInfo.affectedRows && insertPhoto.affectedRows){
        const user = await fetchUser(Id);
        await client.del(`user:${UID}`);
        await client.setEx(`user:${UID}`, 3600, JSON.stringify(user));
        return res.status(200).json({ success: true });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
