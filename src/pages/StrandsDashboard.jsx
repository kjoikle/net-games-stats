import React, { useEffect, useState } from "react";
import api from "../services/api";
import StrandsGameCard from "../components/StrandsGameCard";
import { averageScore } from "../utils/parseGameSummary";

function StrandsDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/strands");
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
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
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
      )}
    </div>
  );
}

export default StrandsDashboard;
