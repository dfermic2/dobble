const {
  iconsMap,
  scoresMap,
  userRooms,
  currentRounds,
  roomInfo,
} = require("../utils/sharedMaps");

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

    console.log("UUUUSER MAP", socket.rooms);

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
    const roomCode = userRooms.get(userId);

    currentRounds.set(roomCode, {
      card1: card1,
      card2: card2,
      sameIconId: sameIconId,
    });

    io.to(roomCode).emit("cards-created", {
      card1,
      card2,
      sameIconId,
    });
  });

  socket.on("pressed-icon", ({ correct }) => {
    const username = socket.data.username;
    const roomCode = userRooms.get(userId);

    console.log("USER ROOMS: ", userRooms);
    console.log(roomCode);

    let currentScore = scoresMap.get(roomCode).get(username);

    console.log("CORRECT: ", correct);

    let newScore = currentScore;

    if (correct) {
      newScore = ++currentScore;
      scoresMap.get(roomCode).set(username, newScore);
      io.to(roomCode).emit("new-round");
    } else {
      newScore = currentScore - 0.5;
      scoresMap.get(roomCode).set(username, newScore);
    }
  });

  socket.on("game-over", () => {
    const roomCode = userRooms.get(userId);
    const finalScores = Array.from(
      scoresMap.get(roomCode),
      ([name, value]) => ({ name, value })
    ).sort((a, b) => b.value - a.value);

    io.to(roomCode).emit("show-scores", { finalScores });
  });

  socket.on("back-to-lobby", () => {
    const roomCode = userRooms.get(userId);
    const roomScores = scoresMap.get(roomCode);
    [...roomScores.keys()].forEach((key) => {
      scoresMap.get(roomCode).set(key, 0);
    });

    roomInfo.set(roomCode, { rounds: 5, icons: 8, inProgress: false });

    io.to(roomCode).emit("navigate-to-lobby");
    io.to(roomCode).emit("room-info", roomInfo.get(roomCode));
  });

  socket.on("change-number", ({ current, pickerId }) => {
    const roomCode = userRooms.get(userId);
    console.log("CURRENT VALUE: ", current);

    const info = roomInfo.get(roomCode);

    if (info) {
      info[pickerId] = current;
      roomInfo.set(roomCode, info);
    }

    socket.to(roomCode).emit("update-number", { current, pickerId });
  });
};
