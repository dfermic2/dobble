const userRooms = require("../utils/shared/userRoomsMap");
const iconsMap = require("../utils/shared/iconsMap");
const scoresMap = require("../utils/shared/scoresMap");

const generateRandomNumbers = (size, iconsNumber) => {
  const randomNumbersSet = new Set();
  while (randomNumbersSet.size < size) {
    randomNumbersSet.add(Math.floor(Math.random() * iconsNumber) + 1);
  }
  return Array.from(randomNumbersSet);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

module.exports = (io, socket) => {
  const userId = socket.handshake.auth.userId;

  socket.on("create-cards", (sizeOfCard) => {
    const arraySize = sizeOfCard * 2 - 1;
    const randomIdArray = generateRandomNumbers(arraySize, iconsMap.size);

    console.log("UUUUSER MAP", userRooms);

    const card1Ids = shuffleArray(randomIdArray.slice(0, sizeOfCard));
    const card2Ids = shuffleArray(randomIdArray.slice(sizeOfCard - 1));

    let card1 = [];
    let card2 = [];

    for (let i = 0; i < card1Ids.length; i++) {
      const id = card1Ids.at(i);
      card1.push({ iconId: id, url: iconsMap.get(id) });
    }

    for (let i = 0; i < card2Ids.length; i++) {
      const id = card2Ids.at(i);
      card2.push({ iconId: id, url: iconsMap.get(id) });
    }

    const sameIconId = randomIdArray.at(sizeOfCard - 1);

    io.to(userRooms.get(userId)).emit("cards-created", {
      card1,
      card2,
      sameIconId,
    });
  });

  socket.on("guessed-icon", () => {
    const username = socket.data.username;
    const roomCode = userRooms.get(userId);
    let currentScore = scoresMap.get(roomCode).get(username);
    scoresMap.get(roomCode).set(username, ++currentScore);
    io.to(roomCode).emit("new-round");
  });

  socket.on("game-over", () => {
    const roomCode = userRooms.get(userId);
    const finalScores = Array.from(
      scoresMap.get(roomCode),
      ([name, value]) => ({ name, value })
    ).sort((a, b) => b.value - a.value);

    console.log("FINAL SOCRES: ", finalScores);
    io.to(roomCode).emit("show-scores", { finalScores });
  });

  socket.on("back-to-lobby", () => {
    const roomCode = userRooms.get(userId);
    const roomScores = scoresMap.get(roomCode);
    [...roomScores.keys()].forEach((key) => {
      scoresMap.get(roomCode).set(key, 0);
    });
    io.to(roomCode).emit("navigate-to-lobby");
  });

  socket.on("change-number", ({ current, pickerId }) => {
    const roomCode = userRooms.get(userId);
    console.log("CURRENT VALUE: ", current);
    socket.to(roomCode).emit("update-number", { current, pickerId });
  });
};
