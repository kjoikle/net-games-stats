import { useState } from "react";
import api from "../services/api";
import { parseGame } from "../utils/parseGameSummary";
import {
  fetchConnectionsData,
  fetchStrandsData,
} from "../utils/queryFunctions";
import { useQuery } from "@tanstack/react-query";

function GameInput() {
  const [gameInput, setGameInput] = useState("");

  // get data for all games
  const { data: connectionsData } = useQuery({
    queryKey: ["connections"],
    queryFn: fetchConnectionsData,
  });

  const { data: strandsData } = useQuery({
    queryKey: ["strands"],
    queryFn: fetchStrandsData,
  });

  async function addToDB(gameType, gameObject) {
    try {
      await api.post(gameType, gameObject);
    } catch (err) {
      console.log(err);
    }
  }

  // check if puzzleNum has already been submitted
  function hasPrevSubmitted(puzzleNumber, gameName) {
    if (gameName == "connections") {
      const res = connectionsData.filter(
        (game) => game.puzzleNumber == puzzleNumber
      );

      if (res.length > 0) {
        return true;
      }
      return false;
    } else if (gameName == "strands") {
      const res = strandsData.filter(
        (game) => game.puzzleNumber == puzzleNumber
      );

      if (res.length > 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    parseGame(gameInput);

    const gameData = parseGame(gameInput); // [gameType, gameObject]

    if (!gameData) {
      setGameInput("");
      return;
    }

    if (hasPrevSubmitted(gameData[1].puzzleNumber, gameData[0])) {
      alert("You've already submitted this game!"); // want to prompt them to overwrite instead
      return;
    }

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
