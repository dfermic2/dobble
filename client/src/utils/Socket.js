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

const socket = io(import.meta.env.VITE_API_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1500,
  path: "/socket.io",
  auth: {
    userId: createUserId(),
  },
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
