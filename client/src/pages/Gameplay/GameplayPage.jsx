import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import socket from "../../utils/Socket";
import DobbleCard from "../../components/DobbleCard/DobbleCard";
import "./GameplayPage.css";

function GameplayPage() {
  if (!sessionStorage.getItem("username")) {
    window.location.href = "/play";
    return;
  }

  const [firstCard, setFirstCard] = useState([]);
  const [secondCard, setSecondCard] = useState([]);
  const [correctIconId, setCorrectIconId] = useState();
  const rounds = sessionStorage.getItem("rounds");
  const cardSize = sessionStorage.getItem("icons");

  const navigate = useNavigate();

  setTimeout(() => {
    if (document.getElementById("overlay")) {
      document.getElementById("overlay").remove();
    }
  }, 1000);

  useEffect(() => {
    socket.connect();

    if (!sessionStorage.getItem("roundNumber")) {
      socket.emit("create-cards", cardSize);
      sessionStorage.setItem("roundNumber", JSON.stringify(1));
    }

    const handleCardsCreated = ({ card1, card2, sameIconId }) => {
      setFirstCard(card1);
      setSecondCard(card2);
      setCorrectIconId(sameIconId);
    };

    const handleNewRound = () => {
      let round = JSON.parse(sessionStorage.getItem("roundNumber"));
      if (round < rounds) {
        round++;

        sessionStorage.setItem("roundNumber", JSON.stringify(round));
        socket.emit("create-cards", cardSize);
      } else {
        sessionStorage.removeItem("roundNumber");
        socket.emit("game-over");
      }
    };

    const handleShowScores = ({ finalScores }) => {
      navigate("/scores", { state: { finalScores } });
    };

    const handleConnected = () => {
      const username = JSON.parse(sessionStorage.getItem("username"));
      const roomCode = JSON.parse(sessionStorage.getItem("roomCode"));

      if (username && roomCode) {
        socket.emit("rejoin-room", { roomCode: roomCode, username: username });
      }
    };

    const handleJoined = ({ roomCode, users }) => {
      sessionStorage.setItem("users", JSON.stringify(users));
    };

    socket.on("cards-created", handleCardsCreated);
    socket.on("new-round", handleNewRound);
    socket.on("show-scores", handleShowScores);
    socket.on("connect", handleConnected);
    socket.on("joined", handleJoined);

    return () => {
      socket.off("cards-created", handleCardsCreated);
      socket.off("new-round", handleNewRound);
      socket.off("show-scores", handleShowScores);
      socket.off("connect", handleConnected);
      socket.off("joined", handleJoined);
    };
  }, []);

  return (
    <div className="gameplay-container">
      <div className="overlay" id="overlay">
        <div className="go-image"></div>
      </div>
      <div className="gameplay-page-container">
        <DobbleCard cardIcons={firstCard} correctIconId={correctIconId} />
        <DobbleCard cardIcons={secondCard} correctIconId={correctIconId} />
      </div>
    </div>
  );
}

export default GameplayPage;
