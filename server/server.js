const express = require("express");

const app = express();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/", (req, res) => {
  res.json({ message: "Connected frontend and backend!" });
});
