const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const iconSchema = new Schema({
  iconId: {
    type: Number,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Icon", iconSchema);
