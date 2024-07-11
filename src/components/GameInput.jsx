import { useState } from "react";
import api from "../services/api";
import { parseGame } from "../utils/parseGameSummary";

function GameInput() {
  const [gameInput, setGameInput] = useState("");

  async function addToDB(gameType, gameObject) {
    try {
      await api.post(gameType, gameObject);
    } catch (err) {
      console.log(err);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    parseGame(gameInput);

    const gameData = parseGame(gameInput); // [gameType, gameObject]

    if (gameData[0] === "connections" || gameData[0] === "strands") {
      addToDB(gameData[0], gameData[1]);
    }

    setGameInput("");
  }

  function handleInputChange(e) {
    setGameInput(e.target.value);
  }

  return (
    <div className="inputBox">
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={gameInput}
          onChange={handleInputChange}
          placeholder="Enter your game summary here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GameInput;
