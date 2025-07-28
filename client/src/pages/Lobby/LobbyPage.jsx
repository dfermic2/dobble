import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import socket from "../../utils/Socket";
import UserList from "../../components/UserList/UserList";
import "./LobbyPage.css";
import NumberPicker from "../../components/NumberPicker/NumberPicker";

function LobbyPage() {
  if (!sessionStorage.getItem("username")) {
    window.location.href = "/play";
  }

  const [users, setUsers] = useState([]);
  const [roomCode, setRoomCode] = useState("");

  const [roundsStart, setRoundsStart] = useState(5);
  const [iconsStart, setIconsStart] = useState(8);

  sessionStorage.setItem("rounds", JSON.stringify(roundsStart));
  sessionStorage.setItem("icons", JSON.stringify(iconsStart));

  const handleStart = () => {
    socket.emit("starting-game", { roomCode });
  };

  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();

    if (!sessionStorage.getItem("users")) {
      sessionStorage.setItem("users", JSON.stringify(users));
    }

    if (!sessionStorage.getItem("roomCode")) {
      sessionStorage.setItem("roomCode", JSON.stringify(roomCode));
    }

    setUsers(JSON.parse(sessionStorage.getItem("users")));
    setRoomCode(JSON.parse(sessionStorage.getItem("roomCode")));

    const handleConnected = () => {
      const username = JSON.parse(sessionStorage.getItem("username"));
      const roomCode = JSON.parse(sessionStorage.getItem("roomCode"));

      if (username && roomCode) {
        socket.emit("rejoin-room", { roomCode: roomCode, username: username });
      }
    };

    const handleCreatedOrJoined = ({ roomCode, users }) => {
      console.log("HANDLE JOINED");
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

    const handleStartedGame = () => {
      navigate("/get-ready");
    };

    const handleUpdateNumber = ({ current, pickerId }) => {
      const temp = current;
      if (pickerId === "rounds") {
        setRoundsStart(temp);
      } else if (pickerId === "icons") {
        setIconsStart(temp);
      }
      sessionStorage.setItem(pickerId, JSON.stringify(current));
    };

    socket.on("connect", handleConnected);
    socket.on("created", handleCreatedOrJoined);
    socket.on("joined", handleCreatedOrJoined);
    socket.on("left-room", handleLeftRoom);
    socket.on("started-game", handleStartedGame);
    socket.on("update-number", handleUpdateNumber);

    return () => {
      socket.off("connect", handleConnected);
      socket.off("created", handleCreatedOrJoined);
      socket.off("joined", handleCreatedOrJoined);
      socket.off("left-room", handleLeftRoom);
      socket.off("started-game", handleStartedGame);
      socket.off("update-number", handleUpdateNumber);
    };
  }, []);

  return (
    <div className="lobby-page-container">
      <div className="lobby-container">
        <div className="lobby-list">
          <UserList users={users} />
        </div>
        <div className="lobby-settings header-font">
          <p className="room-code-text">Room Code: {roomCode}</p>

          <div className="picker-container">
            <div className="rounds-container">
              <p>Number of rounds: </p>
              <NumberPicker
                pickerId="rounds"
                start={roundsStart}
                min={1}
                max={15}
              />
            </div>
            <div className="icons-container">
              <p>Number of icons: </p>
              <NumberPicker
                pickerId="icons"
                start={iconsStart}
                min={2}
                max={16}
              />
            </div>
          </div>

          <div className="start-btn-container">
            <button
              className="btn play-button header-font"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LobbyPage;
