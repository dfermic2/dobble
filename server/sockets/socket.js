const cleanupTimers = new Map();
const { userRooms, currentRounds, roomInfo } = require("../utils/sharedMaps");

module.exports = (io) => {
  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;

    require("./roomCreation")(io, socket);
    require("./gameplay")(io, socket);

    console.log("USER CONNECTED");

    if (cleanupTimers.has(userId)) {
      clearTimeout(cleanupTimers.get(userId));
      cleanupTimers.delete(userId);
      console.log("USER CAME BACK! YIPPIE!");
    }

    socket.on("disconnecting", () => {
      console.log("DISCONNECTED SOCKET: ", socket.data.username);
      console.log("USER ROOMS WHEN DISCONNECTING: ", userRooms);

      const timeout = setTimeout(async () => {
        const roomCode = userRooms.get(userId);
        const username = socket.data.username;

        if (!roomCode) return;

        let users;

        if (roomInfo.get(roomCode)) {
          users = roomInfo.get(roomCode).users;
        }

        userRooms.delete(userId);

        if (users) {
          if (users.size === 1) {
            currentRounds.delete(roomCode);
            roomInfo.delete(roomCode);
          } else {
            const index = users.findIndex((user) => user.username === username);
            if (index !== -1) {
              users.splice(index, 1);
            }
          }
        }

        socket.to(roomCode).emit("left-room", { users: users });

        console.log("SOCKET DISCONNECTING, USER ROOMS: ", userRooms);
      }, 5000);

      cleanupTimers.set(userId, timeout);
    });

    socket.on("disconnect", () => {
      console.log("SOCKET DISCONNECTED");
    });
  });
};
