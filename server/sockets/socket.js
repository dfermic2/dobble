const userRooms = require("../utils/shared/userRoomsMap");
const cleanupTimers = new Map();

module.exports = (io) => {
  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;

    require("./roomCreation")(io, socket);
    require("./cardCreation")(io, socket);

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
};
