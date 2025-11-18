import client from "../models/redisConnection.js";

export const cache = async (req, res, next) => {
  const { Id } = req.params;
  try {
    const cached = await client.get(`user:${Id}`);
    const data = JSON.parse(cached);
    if (data != null) {
      console.log(data);
      return res.status(200).json({ success: true, username: data.display_name, photo: data.photo});
    }
    return next();
  } catch (error) {
    console.log(error);
  }
};
