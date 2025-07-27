import socket from "../../utils/Socket";

function DobbleCard({ cardIcons, correctIconId }) {
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
    <div>
      {console.log(cardIcons)}
      {cardIcons.map((icon) => (
        <img
          src={icon.url}
          id={icon.iconId}
          height="200px"
          onClick={() => handleIconClick(icon.iconId)}
        />
      ))}
    </div>
  );
}

export default DobbleCard;
