const Avatar = require("../models/avatarModel");

const getAllAvatars = async (req, res) => {
  console.log("FETCHING AVATARS");
  try {
    const avatars = await Avatar.find();
    return res.status(200).json(avatars);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = { getAllAvatars };
