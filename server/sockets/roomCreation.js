const random = require("random-string-generator");
const userRooms = require("../utils/shared/userRoomsMap");
const scoresMap = require("../utils/shared/scoresMap");

module.exports = (io, socket) => {
  const userId = socket.handshake.auth.userId;

  socket.on("create-room", ({ username }) => {
    socket.data.username = username;
    const roomCode = random(6);
    console.log("USER ID FROM HANDSHAKE: ", userId);
    userRooms.set(userId, roomCode);
    scoresMap.set(roomCode, new Map());
    scoresMap.get(roomCode).set(username, 0);

    socket.join(roomCode);
    console.log(`Socket ${socket.id} created room ${roomCode}`);

    io.to(roomCode).emit("created", {
      users: [username],
      roomCode: roomCode,
    });
  });

  socket.on("check-room", (roomCode, callback) => {
    const rooms = io.of("/").adapter.rooms;
    callback(rooms.has(roomCode));
  });

  socket.on("join-room", async ({ roomCode, username }) => {
    socket.data.username = username;
    userRooms.set(userId, roomCode);
    scoresMap.get(roomCode).set(username, 0);

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

  socket.on("starting-game", ({ roomCode }) => {
    io.to(roomCode).emit("started-game");
  });
};
