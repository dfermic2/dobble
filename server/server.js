require("dotenv").config();

const emailRoutes = require("./routes/email");

const express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.log("Error connecting to database ", error));

server.listen(process.env.PORT, () => {
  console.log("Server running on port ", process.env.PORT);
});
