import React from "react";
import { Link } from "react-router-dom";

function HubGameCard({ gameName, path }) {
  return (
    <div className={`hubGameCard ${gameName.toLowerCase()}`}>
      <Link to={path}>
        <button>{gameName}</button>
      </Link>
    </div>
  );
}

export default HubGameCard;
