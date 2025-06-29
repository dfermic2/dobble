import { NavLink } from "react-router";
import socket from "../../utils/Socket";
import { useState } from "react";
import "./RoomCreationPage.css";

function RoomCreationPage() {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");

  const createRoom = () => {
    socket.connect();
    socket.emit("create-room", { username: username });
    sessionStorage.setItem("username", JSON.stringify(username));
  };

  const joinRoom = () => {
    socket.connect();
    socket.emit("join-room", { roomCode: roomCode, username: username });
    sessionStorage.setItem("username", JSON.stringify(username));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <div className="join-room-container">
        <input type="text" onChange={(e) => handleUsernameChange(e)} />
        <div className="join-input">
          <input type="text" onChange={(e) => setRoomCode(e.target.value)} />
          <NavLink to={"/lobby"}>
            <button className="header-font btn play-button" onClick={joinRoom}>
              join
            </button>
          </NavLink>
        </div>

        <NavLink to={"/lobby"}>
          <button className="header-font btn play-button" onClick={createRoom}>
            Create room
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default RoomCreationPage;
