import React, { useState, useEffect } from "react";
import { getCurrentDate } from "../utils/parseGameSummary";
import { useQuery } from "@tanstack/react-query";
import {
  fetchConnectionsData,
  fetchStrandsData,
} from "../utils/queryFunctions";
import { getTotalScore } from "../utils/parseGameSummary";

function UserStats() {
  const today = getCurrentDate();

  const {
    data: connectionsData,
    error: connectionsError,
    isLoading: connectionsIsLoading,
  } = useQuery({ queryKey: ["connections"], queryFn: fetchConnectionsData });

  const {
    data: strandsData,
    error: strandsError,
    isLoading: strandsIsLoading,
  } = useQuery({ queryKey: ["strands"], queryFn: fetchStrandsData });

  if (connectionsIsLoading || strandsIsLoading)
    return <div>Loading Your Stats...</div>;
  if (connectionsError) return <div>Error: {connectionsError.message}</div>;
  if (strandsError) return <div>Error: {strandsError.message}</div>;

  const totalGamesPlayed = connectionsData.length + strandsData.length;
  const totalScore =
    getTotalScore(connectionsData) + getTotalScore(strandsData);
  const avgScore =
    totalGamesPlayed > 0
      ? Math.round((totalScore / totalGamesPlayed) * 100) / 100
      : 0;
  return (
    <>
      <div className="statsWrapper">
        <div className="lifetimeStatsWrapper">
          <h2 className="lora">Lifetime Stats:</h2>
          <p>Total Games Played: {totalGamesPlayed}</p>
          <p>Total Score Across All Games: {totalScore}</p>
          <p>Average Score: {avgScore}</p>
        </div>
        <div className="dailyStatsWrapper">
          <h2 className="lora">Daily Stats:</h2>
          <p>Today's Games Played: </p>
          <p>Today's Score: </p>
        </div>
      </div>
    </>
  );
}

export default UserStats;
