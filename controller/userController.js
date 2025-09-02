import { fetchUser } from "../models/sql.js";

export const fetchUserProfile = async (req, res) => {
  const { Id } = req.params;

  try {
    const userData = await fetchUser(Id);
    if (!userData.UID) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        Id: userData.UID,
        username: userData.displayName,
        email: userData.email,
        photo: userData.photo,
        user_info: userData.user_info,
        user_cover_photo: userData.user_cover_photo
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: `ERROR: ${error}` });
    console.log(error);
  }
};
