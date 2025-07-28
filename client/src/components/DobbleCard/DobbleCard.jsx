import socket from "../../utils/Socket";
import "./DobbleCard.css";

function DobbleCard({ cardIcons, correctIconId }) {
  const iconNumber = Object.keys(cardIcons).length;
  console.log(Object.keys(cardIcons));
  const handleIconClick = (iconId) => {
    console.log(iconId);

    if (iconId === correctIconId) {
      console.log("GOOD JOB!");
      socket.emit("guessed-icon");
    } else {
      console.log("NOOOPE!");
    }
  };
  return (
    <div className="dobble-card-container">
      <div className="card-container">
        {cardIcons.map((icon, i) => {
          const top =
            i === 0
              ? "30vh"
              : `${30 * Math.sin((i * 2 * Math.PI) / (iconNumber - 1)) + 30}vh`;
          const left =
            i === 0
              ? "30vh"
              : `${30 * Math.cos((i * 2 * Math.PI) / (iconNumber - 1)) + 30}vh`;
          const width = `${145 * (Math.random() / 2 + 1)}px`;
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
