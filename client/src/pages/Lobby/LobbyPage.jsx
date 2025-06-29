import { useEffect, useState } from "react";
import socket from "../../utils/Socket";
import UserList from "../../components/UserList/UserList";
import "./LobbyPage.css";

function LobbyPage() {
  const [users, setUsers] = useState([]);
  const [roomCode, setRoomCode] = useState("");
  //const [cleanTimeout, setCleanTimeout] = useState();

  useEffect(() => {
    socket.connect();

    // window.addEventListener("beforeunload", () => {
    //   setCleanTimeout(
    //     setTimeout(() => {
    //       localStorage.clear();
    //     }, 5000)
    //   );
    // });

    if (!sessionStorage.getItem("users")) {
      sessionStorage.setItem("users", JSON.stringify(users));
    }

    if (!sessionStorage.getItem("roomCode")) {
      sessionStorage.setItem("roomCode", JSON.stringify(roomCode));
    }

    setUsers(JSON.parse(sessionStorage.getItem("users")));
    setRoomCode(JSON.parse(sessionStorage.getItem("roomCode")));

    const handleConnected = () => {
      console.log("Timeout var ");

      // if (cleanTimeout) {
      //   clearTimeout(cleanTimeout);
      // }

      // if (!sessionStorage.getItem("username")) {
      //   sessionStorage.setItem("username", JSON.stringify(""));
      // }

      // if (!sessionStorage.getItem("roomCode")) {
      //   sessionStorage.setItem("roomCode", JSON.stringify(roomCode));
      // }

      const username = JSON.parse(sessionStorage.getItem("username"));
      const roomCode = JSON.parse(sessionStorage.getItem("roomCode"));

      if (username && roomCode) {
        socket.emit("rejoin-room", { roomCode: roomCode, username: username });
      }
    };

    const handleCreatedOrJoined = ({ roomCode, users }) => {
      setUsers(users);
      setRoomCode(roomCode);
      sessionStorage.setItem("users", JSON.stringify(users));
      sessionStorage.setItem("roomCode", JSON.stringify(roomCode));
    };

    const handleLeftRoom = ({ users }) => {
      console.log(users);

      setUsers(users);
      sessionStorage.setItem("users", JSON.stringify(users));
    };

    socket.on("connect", handleConnected);

    socket.on("created", handleCreatedOrJoined);

    socket.on("joined", handleCreatedOrJoined);

    socket.on("left-room", handleLeftRoom);

    socket.on("disconnect", () => {
      console.log("DISCONNECT EVENT");
    });

    return () => {
      socket.off("connect", handleConnected);
      socket.off("created", handleCreatedOrJoined);
      socket.off("joined", handleCreatedOrJoined);
      socket.off("left-room", handleLeftRoom);
      // socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return (
    <div className="lobby-page-container">
      <h1>Lobby room</h1>
      <p>{roomCode}</p>
      <div className="lobby-container">
        <UserList users={users} />
      </div>
    </div>
  );
}

export default LobbyPage;
