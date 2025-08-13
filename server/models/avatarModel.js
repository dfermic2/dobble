const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const avatarSchema = new Schema({
  cirlce: {
    type: String,
    required: true,
    unique: true,
  },
  full: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Avatar", avatarSchema);
