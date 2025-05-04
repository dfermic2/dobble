const User = require("../models/userModel");
const { createTokens, createAccessToken } = require("../utils/jwt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    createTokens(user, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, avatarId } = req.body;
  try {
    const user = await User.register(username, email, password, avatarId);
    createTokens(user, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const authenticate = (req, res, next) => {
  const accessToken = req.headers["Auth"];

  if (!accessToken) {
    return res.status(401).send("No access token provided.");
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExipredError") {
      return res.status(401).json({ message: "Access token expired" });
    }

    return res.status(403).json({ message: "Invalid access token" });
  }
};

const refresh = (req, res) => {
  const refreshToken = req.cookie["refreshToken"];

  if (!refreshToken) {
    return res.status(401).send("No refresh token provided.");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
    const accessToken = createAccessToken(decoded);
    return res.status(200).header("Auth", accessToken);
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

const logoutUser = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return res.status(200).json({ message: "Refresh token cookie cleared" });
};

module.exports = { loginUser, registerUser, authenticate, refresh, logoutUser };
