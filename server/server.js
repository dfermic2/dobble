require("dotenv").config();

const emailRoutes = require("./routes/email");

const express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");
const random = require("random-string-generator");

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

const userRooms = new Map();
const cleanupTimers = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;

  console.log("USER CONNECTED");

  if (cleanupTimers.has(userId)) {
    clearTimeout(cleanupTimers.get(userId));
    cleanupTimers.delete(userId);

    console.log("USER CAME BACK! YIPPIE!");
  }

  socket.on("create-room", ({ username }) => {
    socket.data.username = username;
    const roomCode = random(6);
    console.log("USER ID FROM HANDSHAKE: ", userId);
    userRooms.set(userId, roomCode);

    socket.join(roomCode);
    console.log(`Socket ${socket.id} created room ${roomCode}`);

    io.to(roomCode).emit("created", { users: [username], roomCode: roomCode });
  });

  socket.on("join-room", async ({ roomCode, username }) => {
    socket.data.username = username;
    userRooms.set(userId, roomCode);

    socket.join(roomCode);
    console.log(`Socket ${socket.id} joined room ${roomCode}`);

    const sockets = await io.in(roomCode).fetchSockets();
    const users = sockets.map((socket) => socket.data.username);

    console.log("USERS", users);
    io.to(roomCode).emit("joined", { users: users, roomCode: roomCode });
  });

  socket.on("rejoin-room", ({ roomCode, username }) => {
    socket.data.username = username;

    console.log("ROOM CODE: ", roomCode);

    console.log("REJOIN ROOM");

    socket.join(roomCode);

    console.log("IN THESE ROOMS: ", socket.rooms);
  });

  socket.on("disconnecting", () => {
    console.log("DISCONNECTED SOCKET: ", socket.data.username);

    const timeout = setTimeout(async () => {
      const roomCode = userRooms.get(userId);
      const sockets = await io.in(roomCode).fetchSockets();
      const users = sockets.map((socket) => socket.data.username);
      userRooms.delete(userId);

      socket.to(roomCode).emit("left-room", { users: users });

      console.log("SOCKET DISCONNECTING, USER ROOMS: ", userRooms);
    }, 5000);

    cleanupTimers.set(userId, timeout);
  });

  socket.on("disconnect", () => {
    console.log("SOCKET DISCONNECTED");
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server running on port ", process.env.PORT);
});
