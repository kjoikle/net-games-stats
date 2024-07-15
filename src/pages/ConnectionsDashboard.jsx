import React from "react";
import ConnectionsGameCard from "../components/ConnectionsGameCard";
import { averageScore } from "../utils/parseGameSummary";
import { useQuery } from "@tanstack/react-query";
import { fetchConnectionsData } from "../utils/queryFunctions";

function ConnectionsDashboard() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["connections"],
    queryFn: fetchConnectionsData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const puzzlesPlayed = data.length;
  const puzzlesSolved = data.filter((game) => game.solved).length;
  const solveRate =
    puzzlesPlayed > 0
      ? `${Math.round((puzzlesSolved / puzzlesPlayed) * 100)}%`
      : "0%";
  const avgScore = averageScore(data);

  // want a way to maintain streak -- can either use datetime (maybe more advanced when limiting submissions to one per day)
  // or can just track by puzzle number

  return (
    <div className="dashboardWrapper">
      <h2 className="bevan">Connections History</h2>
      <div className="lora">
        <div className="dashboardStats">
          <p>Games Played: {puzzlesPlayed}</p>
          <p>Games Solved: {puzzlesSolved}</p>
          <p>Solve Rate: {solveRate}</p>
          <p>Average Score: {avgScore}</p>
        </div>

        <div className="dashboardHistory">
          {data.map((game, index) => {
            return <ConnectionsGameCard key={index} game={game} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ConnectionsDashboard;
