// calls relevant parse function based on game type of input
export const parseGame = (input) => {
  const cleanInput = cleanGameInput(input);
  const gameName = cleanInput[0].split(" ")[0];
  const valid = isValidGame(cleanInput, gameName);

  if (!valid) {
    alert("Enter valid game results!");
    return false;
  }

  if (gameName === "Connections") {
    return parseConnectionsGame(cleanInput);
  } else if (gameName === "Strands") {
    return parseStrandsGame(cleanInput);
  }
};

export function getTotalScore(data) {
  if (!data) return 0;

  let totalScore = 0;
  data.forEach((game) => {
    totalScore += game.score;
  });
  return totalScore;
}

export function averageScore(data) {
  const totalScore = getTotalScore(data);
  const avgScore = data.length > 0 ? totalScore / data.length : 0;
  return avgScore;
}

// returns input in an array of lines with whitespace before and after removed
const cleanGameInput = (input) => {
  const cleanInput = input.trim().split("\n");
  return cleanInput;
};

export function getCurrentDate() {
  const date = new Date();

  return date.toDateString();
}

function validateConnectionsGrid(grid) {
  const rows = grid.slice(2);
  const validChars = ["🟨", "🟦", "🟪", "🟩"];

  if (rows.length < 4 || rows.length > 7) {
    return false;
  }

  for (const row of rows) {
    // Remove any leading or trailing whitespace
    const trimmedRow = row.trim();

    // Check if the row has 4 columns

    const emojiRow = [...trimmedRow];
    if (emojiRow.length !== 4) {
      return false;
    }

    // Check each character in the row
    for (const char of trimmedRow) {
      if (!validChars.includes(char)) {
        return false;
      }
    }
  }

  return true;
}

function validateStrandsGrid(grid) {
  const rows = grid.slice(2);
  const validChars = ["🟡", "💡", "🔵"];

  for (const row of rows) {
    // Remove any leading or trailing whitespace
    const trimmedRow = row.trim();

    // Check each character in the row
    for (const char of trimmedRow) {
      if (!validChars.includes(char)) {
        return false;
      }
    }
  }

  return true;
}

const isValidGame = (input, gameName) => {
  if (input.length == 0) {
    return false;
  }

  if (gameName === "Connections") {
    return validateConnectionsGrid(input);
  } else if (gameName === "Strands") {
    return validateStrandsGrid(input);
  }

  return false;
};

const parseStrandsGame = (input) => {
  const puzzleNumber = Number(input[0].split(" ")[1].slice(1));
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
      indexOfSpangram = index - hintsUsed;
    }
  });

  const score = 100 - 15 * hintsUsed;

  const strandsDate = new Date(2024, 2, 3 + puzzleNumber);

  const newGameObject = {
    id: Number(puzzleNumber),
    date: strandsDate.toDateString(),
    puzzleNumber: puzzleNumber,
    score: score,
    gameBoard: gameBoard,
    hintsUsed: hintsUsed,
    indexOfSpangram: indexOfSpangram, // zero indexed
  };

  return ["strands", newGameObject];
};

// parse input for relevant connections game info and return object
const parseConnectionsGame = (input) => {
  const puzzleNumber = Number(input[1].split(" ")[1].slice(1));
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

  let score = 100;
  if (solved) {
    score -= mistakes * 10;
  } else {
    score = 20;
    score += solveOrder.length * 15;
  }

  const connectionsDate = new Date(2023, 5, 11 + puzzleNumber);

  const newGameObject = {
    id: Number(puzzleNumber),
    date: connectionsDate.toDateString(),
    puzzleNumber: puzzleNumber,
    score: score,
    grid: grid,
    mistakes: mistakes,
    solved: solved,
    yellowSolved: yellowSolved,
    greenSolved: greenSolved,
    blueSolved: blueSolved,
    purpleSolved: purpleSolved,
    solveOrder: solveOrder,
  };

  return ["connections", newGameObject];
};
