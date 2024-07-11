import React, { useState, useEffect } from "react";
import api from "../services/api";
import ConnectionsGameCard from "../components/ConnectionsGameCard";

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

  const puzzlesPlayed = data.length;
  const puzzlesSolved = data.filter((game) => game.solved).length;
  const solveRate =
    puzzlesPlayed > 0
      ? `${Math.round((puzzlesSolved / puzzlesPlayed) * 100)}%`
      : "0%";

  // want a way to maintain streak -- can either use datetime (maybe more advanced when limiting submissions to one per day)
  // or can just track by puzzle number

  return (
    <>
      <h2 className="bevan">Connections History</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div className="lora">
          <p>Games Played: {puzzlesPlayed}</p>
          <p>Games Solved: {puzzlesSolved}</p>
          <p>Solve Rate: {solveRate}</p>

          {data.map((game, index) => {
            return <ConnectionsGameCard game={game} />;
          })}
        </div>
      )}
    </>
  );
}

export default ConnectionsDashboard;
