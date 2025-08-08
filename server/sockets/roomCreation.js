const random = require("random-string-generator");
const {
  userRooms,
  scoresMap,
  currentRounds,
  roomInfo,
} = require("../utils/sharedMaps");

module.exports = (io, socket) => {
  const userId = socket.handshake.auth.userId;

  socket.on("create-room", ({ username }) => {
    socket.data.username = username;
    const roomCode = random(6);
    console.log("USER ID FROM HANDSHAKE: ", userId);
    userRooms.set(userId, roomCode);
    scoresMap.set(roomCode, new Map());
    scoresMap.get(roomCode).set(username, 0);
    roomInfo.set(roomCode, { rounds: 5, icons: 8, inProgress: false });

    socket.join(roomCode);
    console.log(`Socket ${socket.id} created room ${roomCode}`);

    io.to(roomCode).emit("created", {
      users: [username],
      roomCode: roomCode,
    });
  });

  socket.on("check-room", ({ roomCode, username }, callback) => {
    const rooms = io.of("/").adapter.rooms;
    const usernames = scoresMap.get(roomCode);

    if (!rooms.has(roomCode)) {
      callback("Room with this code does not exist!");
    } else if (usernames && usernames.has(username)) {
      callback(
        "Somebody in this room has the same username. Please pick a new one!"
      );
    } else callback("");
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

    socket.emit("room-info", roomInfo.get(roomCode));
  });

  socket.on("rejoin-room", ({ roomCode, username }) => {
    socket.data.username = username;

    console.log("ROOM CODE: ", roomCode);

    console.log("REJOIN ROOM");

    socket.join(roomCode);

    if (currentRounds.has(roomCode)) {
      const { card1, card2, sameIconId } = currentRounds.get(roomCode);
      socket.emit("cards-created", { card1, card2, sameIconId });
    }

    console.log("IN THESE ROOMS: ", socket.rooms);
  });

  socket.on("starting-game", ({ roomCode }) => {
    const info = roomInfo.get(roomCode);

    if (info) {
      info.inProgress = true;
      roomInfo.set(roomCode, info);
    }

    io.to(roomCode).emit("started-game");
  });
};
