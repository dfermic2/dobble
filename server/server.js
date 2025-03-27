require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Connected frontend and backend!" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running on port ", process.env.PORT);
    });
  })
  .catch((error) => console.log("Error connecting to database ", error));
