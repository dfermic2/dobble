import { useLayoutEffect, useState, useRef } from "react";
import socket from "../../utils/Socket";
import "./DobbleCard.css";

function DobbleCard({ cardIcons, correctIconId }) {
  const iconNumber = Number(sessionStorage.getItem("icons"));
  const [iconSize, setIconSize] = useState();
  const [radius, setRadius] = useState();
  const cardContainerRef = useRef(null);
  const wrongIconRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState();
  const [widthList, setWidthList] = useState([]);
  let tops = new Array(iconNumber).fill(0);
  let lefts = new Array(iconNumber).fill(0);

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

  const handleIconClick = (iconId, i) => {
    if (iconId === correctIconId) {
      socket.emit("pressed-icon", { correct: true });
    } else {
      const halfWidth = widthList.at(i) / 2;

      wrongIconRef.current.style.display = "block";
      wrongIconRef.current.style.top = `${tops[i] + halfWidth}px`;
      wrongIconRef.current.style.left = `${lefts[i] + halfWidth}px`;

      setTimeout(() => {
        wrongIconRef.current.style.display = "none";
      }, 1000);

      socket.emit("pressed-icon", { correct: false });
    }
  };

  const returnTop = (i) => {
    let top = radius * Math.sin((i * 2 * Math.PI) / (iconNumber - 1)) + radius;

    if (iconNumber < 5) {
      top = radius * Math.sin((i * 2 * Math.PI) / iconNumber) + radius;
    } else if (i === 0) top = radius;

    tops[i] = top;

    return top;
  };

  const returnLeft = (i) => {
    let left = radius * Math.cos((i * 2 * Math.PI) / (iconNumber - 1)) + radius;
    if (iconNumber < 5) {
      left = radius * Math.cos((i * 2 * Math.PI) / iconNumber) + radius;
    } else if (i === 0) left = radius;

    lefts[i] = left;

    return left;
  };

  return (
    <div className="dobble-card-container" id="dobble-card-container">
      <div ref={wrongIconRef} className="wrong-icon">
        <p>-0.5</p>
      </div>
      <div
        className="card-container"
        id="card-container"
        ref={cardContainerRef}
      >
        {cardIcons.map((icon, i) => {
          const top = `${returnTop(i)}px`;
          const left = `${returnLeft(i)}px`;
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
                onClick={() => handleIconClick(icon.iconId, i)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DobbleCard;
