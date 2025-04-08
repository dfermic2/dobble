require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRotes = require("./routes/user");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Connected frontend and backend!" });
});

app.use("/api/user", userRotes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running on port ", process.env.PORT);
    });
  })
  .catch((error) => console.log("Error connecting to database ", error));
