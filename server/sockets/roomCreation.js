const random = require("random-string-generator");
const { userRooms, currentRounds, roomInfo } = require("../utils/sharedMaps");

module.exports = (io, socket) => {
  const userId = socket.handshake.auth.userId;

  socket.on("create-room", ({ username, circleAvatar }) => {
    socket.data.username = username;

    const roomCode = random(6);
    console.log("USER ID FROM HANDSHAKE: ", userId);
    userRooms.set(userId, roomCode);
    roomInfo.set(roomCode, {
      rounds: 5,
      icons: 8,
      inProgress: false,
      users: [{ username, circleAvatar, score: 0 }],
    });

    socket.join(roomCode);
    console.log(`Socket ${socket.id} created room ${roomCode}`);

    io.to(roomCode).emit("created", {
      users: [{ username, circleAvatar }],
      roomCode: roomCode,
    });
  });

  socket.on("check-room", ({ roomCode, username }, callback) => {
    const rooms = io.of("/").adapter.rooms;

    if (!rooms.has(roomCode)) {
      callback("Room with this code does not exist!");
    } else if (rooms.has(roomCode)) {
      const users = roomInfo.get(roomCode).users;

      if (users && users.find((user) => user.username === username)) {
        callback(
          "Somebody in this room has the same username. Please pick a new one!"
        );
      } else {
        callback("");
      }
    }
  });

  socket.on("join-room", async ({ roomCode, username, circleAvatar }) => {
    socket.data.username = username;

    userRooms.set(userId, roomCode);
    const room = roomInfo.get(roomCode);
    room.users.push({ username, circleAvatar, score: 0 });

    socket.join(roomCode);
    console.log(`Socket ${socket.id} joined room ${roomCode}`);

    io.to(roomCode).emit("joined", { users: room.users, roomCode: roomCode });

    socket.emit("room-info", {
      rounds: room.rounds,
      icons: room.icons,
      inProgress: room.inProgress,
    });
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
    }

    io.to(roomCode).emit("started-game");
  });
};
