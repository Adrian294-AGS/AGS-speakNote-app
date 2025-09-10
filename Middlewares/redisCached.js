import client from "../models/redisConnection.js";

export const cache = async (req, res, next) => {
  client.connect();
  const { Id } = req.params;
  try {
    const cached = await client.get(Id);
    if (data != null) {
      return res.status(200).json({ success: true, data: cached });
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};
