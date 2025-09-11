import client from "../models/redisConnection.js";

export const cache = async (req, res, next) => {
  const { Id } = req.params;
  try {
    const cached = await client.get(`user:${Id}`);
    const data = JSON.parse(cached);
    if (data != null) {
      return res.status(200).json({ success: true, username: data.username, photo: data.photo});
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};
