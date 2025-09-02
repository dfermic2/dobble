import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import socket from "../../utils/Socket";
import ScoresTable from "../../components/ScoresTable/ScoresTable";
import "./ScoresPage.css";

function ScoresPage() {
  if (!sessionStorage.getItem("username")) {
    window.location.href = "/play";
    return;
  }

  const location = useLocation();
  const scores = location.state.finalScores;
  const navigate = useNavigate();
  const winner = scores.at(0);

  const handleBackToLobby = () => {
    sessionStorage.setItem("rounds", JSON.stringify(5));
    sessionStorage.setItem("icons", JSON.stringify(8));
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
    <div className="scores-page-container">
      <div className="scores-page">
        <div className="scores-page-left">
          <div className="final-scores-header">
            <h1 className="header-font">Final scores:</h1>
          </div>
          <div className="scores-table-component">
            <ScoresTable finalScores={scores} />
          </div>
        </div>
        <div className="scores-page-right">
          <div className="winner-image-container">
            <img src={winner.circleAvatar} alt="avatar" />
          </div>
        </div>
      </div>
      <div className="back-to-lobby-btn-container">
        <div className="back-to-lobby-btn">
          <button
            className="header-font btn play-button"
            onClick={handleBackToLobby}
          >
            BACK TO LOBBY
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoresPage;
