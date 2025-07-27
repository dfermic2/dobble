import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import socket from "../../utils/Socket";
import ScoresTable from "../../components/ScoresTable/ScoresTable";

function ScoresPage() {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  const handleBackToLobby = () => {
    socket.emit("back-to-lobby");
  };

  useEffect(() => {
    socket.connect();

    const handleShowScores = ({ finalScores }) => {
      console.log("FINAL SCORES: ", finalScores);
      setScores(finalScores);
    };

    const handleNavigateToLobby = () => {
      navigate("/lobby");
    };

    socket.on("show-scores", handleShowScores);

    socket.on("navigate-to-lobby", handleNavigateToLobby);

    return () => {
      socket.off("show-scores", handleShowScores);
      socket.on("navigate-to-lobby", handleNavigateToLobby);
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
