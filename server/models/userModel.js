const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarId: {
    type: Number,
    required: true,
  },
});

userSchema.statics.register = async function (
  username,
  email,
  password,
  avatarId
) {
  if (!email || !username || !password || !avatarId) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use");
  }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error("Username already in use");
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash, avatarId });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid credentials");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
