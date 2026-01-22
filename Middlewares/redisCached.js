import client from "../models/redisConnection.js";

export const cache = async (req, res, next) => {
  const UID = req.user;
  try {
    const cached = await client.get(`user:${UID}`);
    const data = JSON.parse(cached);
    if (data != null) {
      return res.status(200).json({ success: true, Id: UID, username: data.display_name, photo: data.photo});
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
