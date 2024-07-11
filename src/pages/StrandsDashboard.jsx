import React, { useEffect, useState } from "react";
import api from "../services/api";
import StrandsGameCard from "../components/StrandsGameCard";

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

  return (
    <>
      <h2 className="bevan">Strands History</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div className="lora">
          <p>Games Played: {puzzlesPlayed}</p>
          <p>Hints Per Game: {hintsPerGame}</p>

          {data.map((game, index) => {
            return <StrandsGameCard game={game} />;
          })}
        </div>
      )}
    </>
  );
}

export default StrandsDashboard;
