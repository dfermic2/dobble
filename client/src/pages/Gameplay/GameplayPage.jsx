import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import socket from "../../utils/Socket";
import DobbleCard from "../../components/DobbleCard/DobbleCard";
import "./GameplayPage.css";

function GameplayPage() {
  const [firstCard, setFirstCard] = useState([]);
  const [secondCard, setSecondCard] = useState([]);
  const [correctIconId, setCorrectIconId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();
    socket.emit("create-cards");

    sessionStorage.setItem("roundNumber", JSON.stringify(1));

    console.log("GAMEPLAY PAGEEE");

    const handleCardsCreated = ({ card1, card2, sameIconId }) => {
      setFirstCard(card1);
      setSecondCard(card2);
      setCorrectIconId(sameIconId);
    };

    const handleNewRound = () => {
      let round = JSON.parse(sessionStorage.getItem("roundNumber"));
      if (round < 2) {
        round++;
        sessionStorage.setItem("roundNumber", JSON.stringify(round));
        socket.emit("create-cards");
      } else {
        socket.emit("game-over");
        navigate("/scores");
      }
    };

    socket.on("cards-created", handleCardsCreated);
    socket.on("new-round", handleNewRound);

    return () => {
      socket.off("cards-created", handleCardsCreated);
      socket.off("new-round", handleNewRound);
    };
  }, []);

  return (
    <div className="gameplay-page-container">
      <DobbleCard cardIcons={firstCard} correctIconId={correctIconId} />
      <DobbleCard cardIcons={secondCard} correctIconId={correctIconId} />
    </div>
  );
}

export default GameplayPage;
