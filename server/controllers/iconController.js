const Icon = require("../models/iconModel");
const iconsMap = require("../utils/shared/iconsMap");

const getAllIcons = async (req, res) => {
  try {
    const icons = await Icon.find();
    icons.forEach((icon) => {
      iconsMap.set(icon.iconId, icon.url);
    });

    return res.status(200).json(icons);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = { getAllIcons };
