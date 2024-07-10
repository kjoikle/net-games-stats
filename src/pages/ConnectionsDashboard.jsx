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

  return (
    <>
      <h2>Connections History</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data &&
        data.map((game, index) => {
          return <p key={index}>{game.grid}</p>;
        })}
    </>
  );
}

export default ConnectionsDashboard;
