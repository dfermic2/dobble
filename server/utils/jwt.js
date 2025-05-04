const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
};

const createTokens = (user, res) => {
  const refreshToken = createRefreshToken(user);
  const accessToken = createAccessToken(user);

  return res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .header("Auth", accessToken)
    .status(200)
    .json({
      user: {
        id: user._id,
        username: user.username,
      },
    });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  createTokens,
};
