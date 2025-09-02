require("dotenv").config();

const emailRoutes = require("./routes/email");
const iconRoutes = require("./routes/icon");
const avatarRoutes = require("./routes/avatar");

const express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://dobble-client.onrender.com",
    methods: ["GET", "POST"],
  })
);

const server = http.createServer(app);
const io = new Server(server);

require("./sockets/socket")(io);

app.get("/", (req, res) => {
  res.json({ message: "Connected frontend and backend!" });
});

app.use("/api/email", emailRoutes);
app.use("/api/icon", iconRoutes);
app.use("/api/avatar", avatarRoutes);

mongoose
  .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.log("Error connecting to database ", error));

server.listen(process.env.PORT, () => {
  console.log("Server running on port ", process.env.PORT);
});
