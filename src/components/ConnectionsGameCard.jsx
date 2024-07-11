import React from "react";

function ConnectionsGameCard({ game }) {
  return (
    <div className="gameCard">
      <h4>Puzzle #{game.puzzleNumber}</h4>
      <p>
        {game.grid.map((line) => (
          <p className="connectionsGridLine">{line}</p>
        ))}
      </p>
    </div>
  );
}

export default ConnectionsGameCard;
