import { fetchUser, updateUsers, selectUserInfo, updateUsersInfo } from "../models/sql.js";
import client from "../models/redisConnection.js";
import { valueCheker } from "../services/valueChecker.js";

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
      userData,
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
    if (!user) {
      return res.status(404).json({ success: false, messsage: "Id not found" });
    }
    client.setEx(`user:${UID}`, 3600, JSON.stringify(user));
    return res
      .status(200)
      .json({
        success: true,
        Id: UID,
        username: user.displayName,
        photo: user.photo,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Server Error` });
  }
};

export const userUpdate = async (req, res) => {
  const { Info } = req.body;
  const UID = req.user;
  const photo = req.file || null;

  try {
    const userInfoId = await selectUserInfo(UID);
    let set = { photo: photo, userInfo: Info};
    const verifiedSet = await valueCheker(set);
    
    if(verifiedSet.photo && verifiedSet.userInfo){
      await updateUsers({photo: verifiedSet.photo.filename}, UID);
      await updateUsersInfo({userInfo: verifiedSet.userInfo}, userInfoId);
      const user = await fetchUser(UID);
      await client.del(`user:${UID}`);
      await client.setEx(`user:${UID}`, 3600, JSON.stringify(user));
      return res.status(200).json({ success: true });
    } else if(verifiedSet.photo != null){
      await updateUsers({photo: verifiedSet.photo.filename}, UID);
      const user = await fetchUser(UID);
      await client.del(`user:${UID}`);
      await client.setEx(`user:${UID}`, 3600, JSON.stringify(user));
      return res.status(200).json({ success: true });
    } else {
      await updateUsersInfo({userInfo: verifiedSet.userInfo}, userInfoId);
      const user = await fetchUser(UID);
      await client.del(`user:${UID}`);
      await client.setEx(`user:${UID}`, 3600, JSON.stringify(user));
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
