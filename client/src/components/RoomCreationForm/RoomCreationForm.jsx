import { NavLink, useNavigate } from "react-router";
import socket from "../../utils/Socket";
import { useState } from "react";
import "./RoomCreationForm.css";
import AvatarPicker from "../AvatarPicker/AvatarPicker";

function RoomCreationForm({ avatar, avatarData, changeAvatar }) {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [roomCodeError, setRoomCodeError] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const navigate = useNavigate();

  const createRoom = (e) => {
    if (username === "") {
      e.preventDefault();
      setUsernameError(true);
    } else {
      socket.connect();
      socket.emit("create-room", {
        username: username,
        circleAvatar: avatar.circle,
      });
      sessionStorage.setItem("username", JSON.stringify(username));
    }
  };

  const joinRoom = (e) => {
    e.preventDefault();

    if (username === "") {
      setUsernameError(true);
      return;
    }

    if (roomCode === "") {
      setRoomCodeError("Please enter a room code to join");
      return;
    }

    socket.connect();
    socket.emit(
      "check-room",
      { roomCode: roomCode, username: username },
      (exists) => {
        if (!(exists.length === 0)) {
          setRoomCodeError(exists);
          return;
        }

        sessionStorage.setItem("username", JSON.stringify(username));
        socket.emit("join-room", {
          roomCode: roomCode,
          username: username,
          circleAvatar: avatar.circle,
        });
        navigate("/lobby");
      }
    );
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

    if (e.target.value === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const handleRoomCodeChange = (e) => {
    setRoomCode(e.target.value);

    if (e.target.value === "") {
      setRoomCodeError("Please enter a room code to join");
    } else {
      setRoomCodeError(false);
    }
  };

  const handleAvatarClick = (e) => {
    const show = showPicker;
    setShowPicker(!show);
  };

  return (
    <form action="submit" className="room-creation-form-container">
      <div className="current-avatar-and-picker">
        <div className="current-avatar-container" onClick={handleAvatarClick}>
          <img src={avatar.circle} alt="avatar" className="current-avatar" />
        </div>

        {showPicker && (
          <div className="avatar-picker-component">
            <AvatarPicker avatars={avatarData} changeAvatar={changeAvatar} />
          </div>
        )}
      </div>

      <div className="username-container">
        <input
          type="text"
          onChange={(e) => handleUsernameChange(e)}
          placeholder="Username"
          required
        />
        {usernameError && <p>Username is required</p>}
      </div>
      <div>
        <div className="join-input">
          <input
            type="text"
            onChange={(e) => handleRoomCodeChange(e)}
            placeholder="Room code"
          />
          <button
            className="header-font btn play-button"
            onClick={(e) => joinRoom(e)}
          >
            join
          </button>
        </div>
        {roomCodeError && <p>{roomCodeError}</p>}
      </div>

      <NavLink to={"/lobby"}>
        <button
          className="header-font btn play-button create-room-btn"
          onClick={(e) => createRoom(e)}
        >
          Create room
        </button>
      </NavLink>
    </form>
  );
}

export default RoomCreationForm;
