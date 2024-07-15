import React from "react";
import StrandsGameCard from "../components/StrandsGameCard";
import { averageScore } from "../utils/parseGameSummary";
import { useQuery } from "@tanstack/react-query";
import { fetchStrandsData } from "../utils/queryFunctions";

function StrandsDashboard() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["strands"],
    queryFn: fetchStrandsData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const puzzlesPlayed = data.length;
  const totalHintsUsed = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.hintsUsed,
    0
  );
  const hintsPerGame =
    puzzlesPlayed > 0
      ? Math.round((totalHintsUsed / puzzlesPlayed) * 100) / 100
      : 0;

  const avgScore = averageScore(data);

  return (
    <div className="dashboardWrapper">
      <h2 className="bevan">Strands History</h2>

      <div className="lora">
        <div className="dashboardStats">
          <p>Games Played: {puzzlesPlayed}</p>
          <p>Hints Per Game: {hintsPerGame}</p>
          <p>Average Score: {avgScore}</p>
        </div>

        <div className="dashboardHistory">
          {data.map((game, index) => {
            return <StrandsGameCard key={index} game={game} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default StrandsDashboard;
