import { useEffect, useState } from "react";
import socket from "../../utils/Socket";
import "./DobbleCard.css";

function DobbleCard({ cardIcons, correctIconId }) {
  const iconNumber = sessionStorage.getItem("icons");
  console.log(iconNumber);
  const [iconSize, setIconSize] = useState();
  const [radius, setRadius] = useState();

  useEffect(() => {
    const containerHeight =
      document.getElementById("card-container").clientHeight;

    setRadius(containerHeight / 2);

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
      const iconPosition = document
        .getElementById(iconId)
        .getBoundingClientRect();

      const xIcon = document.getElementById("x-icon");

      xIcon.style.display = "block";
      xIcon.style.top = `${iconPosition.top}px`;
      xIcon.style.left = `${iconPosition.left}px`;

      setTimeout(() => {
        xIcon.style.display = "none";
      }, 1000);

      socket.emit("pressed-icon", { correct: false });
    }
  };

  const returnTop = (i) => {
    if (iconNumber < 5) {
      return `${radius * Math.sin((i * 2 * Math.PI) / iconNumber) + radius}px`;
    } else if (i === 0) return `${radius}px`;
    return `${
      radius * Math.sin((i * 2 * Math.PI) / (iconNumber - 1)) + radius
    }px`;
  };

  const returnLeft = (i) => {
    console.log("RADIUS: ", radius);
    if (iconNumber < 5) {
      return `${radius * Math.cos((i * 2 * Math.PI) / iconNumber) + radius}px`;
    } else if (i === 0) return `${radius}px`;
    return `${
      radius * Math.cos((i * 2 * Math.PI) / (iconNumber - 1)) + radius
    }px`;
  };

  const returnWidth = () => {
    if (iconNumber < 5) {
      return `${iconSize * 0.8 * (Math.random() / 2 + 1)}px`;
    }
    return `${iconSize * (Math.random() / 2 + 1)}px`;
  };

  return (
    <div className="dobble-card-container" id="dobble-card-container">
      <div id="x-icon">
        <p>X</p>
      </div>
      <div className="card-container" id="card-container">
        {cardIcons.map((icon, i) => {
          const top = returnTop(i);
          const left = returnLeft(i);
          const width = returnWidth();
          const rotation = `${Math.random()}turn`;
          return (
            <div
              id={icon.iconId}
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
