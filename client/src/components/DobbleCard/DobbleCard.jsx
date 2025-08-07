import { useLayoutEffect, useState, useRef } from "react";
import socket from "../../utils/Socket";
import "./DobbleCard.css";

function DobbleCard({ cardIcons, correctIconId }) {
  const iconNumber = Number(sessionStorage.getItem("icons"));
  const [iconSize, setIconSize] = useState();
  const [radius, setRadius] = useState();
  const cardContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState();
  const [widthList, setWidthList] = useState([]);

  useLayoutEffect(() => {
    const createSizes = () => {
      const newHeight = cardContainerRef.current.clientHeight;
      setContainerHeight(newHeight);
      setRadius(newHeight / 2);
      const dobbleContainerSize = Math.pow(newHeight / 2, 2) * Math.PI * 0.7;
      const sizeOfIcon = dobbleContainerSize / iconNumber;
      setIconSize(Math.sqrt(sizeOfIcon));
    };

    let timer;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => createSizes(), 200);
    };

    window.addEventListener("resize", handleResize);

    createSizes();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (!iconSize || !iconNumber) return;

    const widths = [];

    for (let i = 0; i < iconNumber; i++) {
      const widthValue =
        iconNumber < 5
          ? iconSize * 0.8 * (Math.random() / 2 + 1)
          : iconSize * (Math.random() / 2 + 1);

      widths.push(widthValue);
    }

    setWidthList(widths);
  }, [iconSize, iconNumber]);

  const handleIconClick = (iconId) => {
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
    if (iconNumber < 5) {
      return `${radius * Math.cos((i * 2 * Math.PI) / iconNumber) + radius}px`;
    } else if (i === 0) return `${radius}px`;
    return `${
      radius * Math.cos((i * 2 * Math.PI) / (iconNumber - 1)) + radius
    }px`;
  };

  return (
    <div className="dobble-card-container" id="dobble-card-container">
      <div id="x-icon">
        <p>X</p>
      </div>
      <div
        className="card-container"
        id="card-container"
        ref={cardContainerRef}
      >
        {cardIcons.map((icon, i) => {
          const top = returnTop(i);
          const left = returnLeft(i);
          const width = `${widthList.at(i)}px`;
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
