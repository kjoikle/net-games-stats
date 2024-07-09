// calls relevant parse function based on game type of input
export const parseGame = (input) => {
  const cleanInput = cleanGameInput(input);
  const valid = isValidGame(input);
  const gameName = cleanInput[0].split(" ")[0];

  if (!valid) {
    alert("Enter valid game results!");
  } else if (gameName === "Connections") {
    return parseConnectionsGame(cleanInput);
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

// parse input for relevant connections game info and return object
// input = cleaned data
const parseConnectionsGame = (input) => {
  const puzzleNumber = input[1].split(" ")[1].slice(1); // need to think about what type this should be / what am i going to do with it
  const grid = input.slice(2);
  const mistakes = grid.length - 4;
  const solved = mistakes < 4;
  let yellow_solved = null;
  let green_solved = null;
  let blue_solved = null;
  let purple_solved = null;
  let solve_order = null;

  if (solved) {
    solve_order = grid.filter((row) => {
      return (
        row === "🟨🟨🟨🟨" ||
        row === "🟩🟩🟩🟩" ||
        row === "🟦🟦🟦🟦" ||
        row === "🟪🟪🟪🟪"
      );
    });
    yellow_solved = solve_order.indexOf("🟨🟨🟨🟨");
    green_solved = solve_order.indexOf("🟩🟩🟩🟩");
    blue_solved = solve_order.indexOf("🟦🟦🟦🟦");
    purple_solved = solve_order.indexOf("🟪🟪🟪🟪");
  }

  const newGameObject = {
    puzzleNumber: puzzleNumber,
    grid: grid,
    mistakes: mistakes,
    solved: solved,
    yellow_solved: yellow_solved,
    green_solved: green_solved,
    blue_solved: blue_solved,
    purple_solved: purple_solved,
    solve_order: solve_order,
  };

  return newGameObject;
};
