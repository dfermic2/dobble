import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import socket from "../../utils/Socket";
import ScoresTable from "../../components/ScoresTable/ScoresTable";

function ScoresPage() {
  const location = useLocation();
  const scores = location.state.finalScores;
  const navigate = useNavigate();

  const handleBackToLobby = () => {
    socket.emit("back-to-lobby");
  };

  useEffect(() => {
    socket.connect();

    const handleNavigateToLobby = () => {
      navigate("/lobby");
    };

    const handleConnected = () => {
      console.log("HANDLE CONNECTED");
      const username = JSON.parse(sessionStorage.getItem("username"));
      const roomCode = JSON.parse(sessionStorage.getItem("roomCode"));

      if (username && roomCode) {
        socket.emit("rejoin-room", { roomCode: roomCode, username: username });
      }
    };

    const handleJoined = ({ roomCode, users }) => {
      sessionStorage.setItem("users", JSON.stringify(users));
    };

    socket.on("navigate-to-lobby", handleNavigateToLobby);
    socket.on("connect", handleConnected);
    socket.on("joined", handleJoined);

    return () => {
      socket.off("navigate-to-lobby", handleNavigateToLobby);
      socket.off("connect", handleConnected);
      socket.off("joined", handleJoined);
    };
  }, []);

  return (
    <div>
      <ScoresTable finalScores={scores} />
      <button
        className="header-font btn play-button"
        onClick={handleBackToLobby}
      >
        BACK TO LOBBY
      </button>
    </div>
  );
}

export default ScoresPage;
