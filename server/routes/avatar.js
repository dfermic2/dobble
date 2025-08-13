const express = require("express");
const { getAllAvatars } = require("../controllers/avatarController");

const router = express.Router();

router.get("/get-all", getAllAvatars);

module.exports = router;
