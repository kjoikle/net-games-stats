import React, { useState, useEffect } from "react";
import api from "../services/api";

function ConnectionsDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/connections");
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function getTotalGamesInfo() {
    // look into what is the proper way to display this; do i maintain a variable? there is def a better way than i currently have it since calling function 3x
    const puzzlesPlayed = data.length;
    let puzzlesSolved = 0;

    data.forEach((game) => {
      if (game.solved) {
        puzzlesSolved++;
      }
    });

    const solveRate = puzzlesSolved / puzzlesPlayed; // want to round this to like 2 decimals and put '%' at end

    return {
      puzzlesPlayed: puzzlesPlayed,
      puzzlesSolved: puzzlesSolved,
      solveRate: solveRate,
    };
  }

  // want a way to maintain streak -- can either use datetime (maybe more advanced when limiting submissions to one per day)
  // or can just track by puzzle number

  return (
    <>
      <h2>Connections History</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h3>Games Played: {getTotalGamesInfo().puzzlesPlayed}</h3>
          <h3>Games Solved: {getTotalGamesInfo().puzzlesSolved}</h3>
          <h3>Solve Rate: {getTotalGamesInfo().solveRate}</h3>

          {data.map((game, index) => {
            return <p key={index}>{game.grid}</p>;
          })}
        </div>
      )}
    </>
  );
}

export default ConnectionsDashboard;
