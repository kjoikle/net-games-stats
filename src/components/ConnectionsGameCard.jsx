import React from "react";

function ConnectionsGameCard({ game }) {
  return (
    <div className="gameCard">
      <h4>Puzzle #{game.puzzleNumber}</h4>
      <h4>
        {game.grid.map((line) => (
          <p>{line}</p>
        ))}
      </h4>
    </div>
  );
}

export default ConnectionsGameCard;
