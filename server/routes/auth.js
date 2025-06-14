const express = require("express");

const router = express.Router();

const {
  loginUser,
  registerUser,
  authenticate,
  refresh,
  logoutUser,
} = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/register", registerUser);

//middleware
router.get("/authenticate", authenticate);

router.post("/refresh", refresh);
router.post("/logout", logoutUser);

module.exports = router;
