import { useState } from "react";
import { parseGame } from "../utils/parseGameSummary";

function GameInput() {
  const [gameInput, setGameInput] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(parseGame(gameInput));
    setGameInput("");
  }

  function handleInputChange(e) {
    setGameInput(e.target.value);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={gameInput}
          onChange={handleInputChange}
          placeholder="Enter your game summary here"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default GameInput;
