import { io } from "socket.io-client";

function createUserId() {
  let userId = sessionStorage.getItem("userId");
  console.log("SOCKET IO, CREATING USER ID", userId);

  if (!userId) {
    userId = crypto.randomUUID();
    console.log("CREATED ID: ", userId);
    sessionStorage.setItem("userId", userId);
  }

  return userId;
}

const socket = io("/", {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
  path: "/socket.io",
  auth: {
    userId: createUserId(),
  },
});

export default socket;
