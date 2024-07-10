// calls relevant parse function based on game type of input
export const parseGame = (input) => {
  const cleanInput = cleanGameInput(input);
  const valid = isValidGame(input);
  const gameName = cleanInput[0].split(" ")[0];

  if (!valid) {
    alert("Enter valid game results!");
  } else if (gameName === "Connections") {
    return parseConnectionsGame(cleanInput);
  } else if (gameName === "Strands") {
    return parseStrandsGame(cleanInput);
  } else {
    alert("We don't yet support this game :(");
  }
};

// cleans up input
const cleanGameInput = (input) => {
  const cleanInput = input.split("\n"); // clean empty rows and extra spaces
  return cleanInput;
};

// validates game input NEED TO IMPLEMENT
const isValidGame = (input) => {
  return true;
};

const parseStrandsGame = (input) => {
  const puzzleNumber = input[0].split(" ")[1].slice(1);
  const rawGameBoard = input.slice(2);
  let gameBoard = [];
  let hintsUsed = 0;
  let indexOfSpangram = -1;

  rawGameBoard.forEach((line) => {
    gameBoard = gameBoard.concat(line);
  });
  gameBoard = gameBoard.join("");
  gameBoard = [...gameBoard]; // gameBoard is an array of the game emojis

  gameBoard.forEach((value, index) => {
    if (value === "💡") {
      hintsUsed++;
    } else if (value === "🟡") {
      indexOfSpangram = index;
    }
  });

  const newGameObject = {
    id: Number(puzzleNumber),
    puzzleNumber: puzzleNumber,
    gameBoard: gameBoard,
    hintsUsed: hintsUsed,
    indexOfSpangram: indexOfSpangram, // zero indexed
  };

  console.log(newGameObject);

  return ["strands", newGameObject];
};

// parse input for relevant connections game info and return object
const parseConnectionsGame = (input) => {
  const puzzleNumber = input[1].split(" ")[1].slice(1);
  const grid = input.slice(2);
  let yellowSolved = null;
  let greenSolved = null;
  let blueSolved = null;
  let purpleSolved = null;
  let solveOrder = null;

  solveOrder = grid.filter((row) => {
    return (
      row === "🟨🟨🟨🟨" ||
      row === "🟩🟩🟩🟩" ||
      row === "🟦🟦🟦🟦" ||
      row === "🟪🟪🟪🟪"
    );
  });
  yellowSolved = solveOrder.indexOf("🟨🟨🟨🟨");
  greenSolved = solveOrder.indexOf("🟩🟩🟩🟩");
  blueSolved = solveOrder.indexOf("🟦🟦🟦🟦");
  purpleSolved = solveOrder.indexOf("🟪🟪🟪🟪");

  const mistakes = grid.length - solveOrder.length;
  const solved = mistakes < 4;

  const newGameObject = {
    id: Number(puzzleNumber),
    puzzleNumber: puzzleNumber,
    grid: grid,
    mistakes: mistakes,
    solved: solved,
    yellowSolved: yellowSolved,
    greenSolved: greenSolved,
    blueSolved: blueSolved,
    purpleSolved: purpleSolved,
    solveOrder: solveOrder,
  };

  currentIndex++;

  return ["connections", newGameObject];
};
