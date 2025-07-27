const express = require("express");
const { getAllIcons } = require("../controllers/iconController");

const router = express.Router();

router.get("/get-all", getAllIcons);

module.exports = router;
