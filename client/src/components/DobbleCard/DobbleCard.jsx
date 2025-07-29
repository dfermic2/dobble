import { useEffect, useLayoutEffect, useState } from "react";
import socket from "../../utils/Socket";
import "./DobbleCard.css";

function DobbleCard({ cardIcons, correctIconId }) {
  const iconNumber = sessionStorage.getItem("icons");
  const [iconSize, setIconSize] = useState();

  useEffect(() => {
    const containerHeight =
      document.getElementById("card-container").clientHeight;

    const dobbleContainerSize =
      Math.pow(containerHeight / 2, 2) * Math.PI * 0.7;

    const sizeOfIcon = dobbleContainerSize / iconNumber;

    setIconSize(Math.sqrt(sizeOfIcon));
  }, []);

  const handleIconClick = (iconId) => {
    console.log(iconId);

    if (iconId === correctIconId) {
      socket.emit("pressed-icon", { correct: true });
    } else {
      socket.emit("pressed-icon", { correct: false });
    }
  };

  const returnTop = (i) => {
    if (iconNumber < 5) {
      return `${30 * Math.sin((i * 2 * Math.PI) / iconNumber) + 30}vh`;
    } else if (i === 0) return "30vh";
    return `${30 * Math.sin((i * 2 * Math.PI) / (iconNumber - 1)) + 30}vh`;
  };

  const returnLeft = (i) => {
    if (iconNumber < 5) {
      return `${30 * Math.cos((i * 2 * Math.PI) / iconNumber) + 30}vh`;
    } else if (i === 0) return "30vh";
    return `${30 * Math.cos((i * 2 * Math.PI) / (iconNumber - 1)) + 30}vh`;
  };

  const returnWidth = () => {
    if (iconNumber < 5) {
      return `${iconSize * 0.8 * (Math.random() / 2 + 1)}px`;
    }
    return `${iconSize * (Math.random() / 2 + 1)}px`;
  };

  return (
    <div className="dobble-card-container" id="dobble-card-container">
      <div className="card-container" id="card-container">
        {cardIcons.map((icon, i) => {
          const top = returnTop(i);
          const left = returnLeft(i);
          const width = returnWidth();
          const rotation = `${Math.random()}turn`;
          return (
            <div
              key={icon.iconId}
              className="icon-container"
              style={{
                width,
                position: "absolute",
                top,
                left,
                transform: `rotate(${rotation})`,
              }}
            >
              <img
                src={icon.url}
                id={icon.iconId}
                onClick={() => handleIconClick(icon.iconId)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DobbleCard;
