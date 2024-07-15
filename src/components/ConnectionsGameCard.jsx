import React from "react";

function ConnectionsGameCard({ game }) {
  return (
    <div className="gameCard">
      <h4>Puzzle #{game.puzzleNumber}</h4>
      <h5>Score: {game.score}</h5>
      <div>
        {game.grid.map((line, index) => (
          <p key={index} className="connectionsGridLine">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ConnectionsGameCard;
