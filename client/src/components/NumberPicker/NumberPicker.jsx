import { useEffect, useState } from "react";
import "./NumberPicker.css";
import socket from "../../utils/Socket";

function NumberPicker({ pickerId, start, min, max }) {
  const [number, setNumber] = useState(start);
  const minusId = pickerId + "minusBtn";
  const plusId = pickerId + "plusBtn";

  useEffect(() => {
    setNumber(start);

    if (start === min) {
      document.getElementById(minusId).disabled = true;
    } else {
      document.getElementById(minusId).disabled = false;
    }

    if (start === max) {
      document.getElementById(plusId).disabled = true;
    } else {
      document.getElementById(plusId).disabled = false;
    }
  }, [start]);

  const handleMinus = (e) => {
    e.preventDefault();

    const current = number - 1;

    socket.emit("change-number", { current, pickerId });

    setNumber(current);
    sessionStorage.setItem(pickerId, JSON.stringify(current));

    if (number === min + 1) {
      document.getElementById(minusId).disabled = true;
    } else if (number === max) {
      document.getElementById(plusId).disabled = false;
    }
  };

  const handlePlus = (e) => {
    e.preventDefault();

    const current = number + 1;
    socket.emit("change-number", { current, pickerId });

    setNumber(current);
    sessionStorage.setItem(pickerId, JSON.stringify(current));

    if (number === min) {
      document.getElementById(minusId).disabled = false;
    } else if (number === max - 1) {
      document.getElementById(plusId).disabled = true;
    }
  };

  return (
    <div className="number-picker-container header-font" id={pickerId}>
      <button onClick={(e) => handleMinus(e)} id={minusId} className="minusBtn">
        -
      </button>
      <p>{number}</p>
      <button onClick={(e) => handlePlus(e)} id={plusId} className="plusBtn">
        +
      </button>
    </div>
  );
}

export default NumberPicker;
