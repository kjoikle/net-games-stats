import GameInput from "../components/GameInput";
import HubGameCard from "../components/HubGameCard";

function HomeDashboard() {
  return (
    <div className="dashboardWrapper">
      <div className="homeHeader">
        <h1 className="bevan">Your NYT Games Dashboard</h1>
        <GameInput />
      </div>

      <div className="homeBody">
        <HubGameCard gameName="Connections" path="/connections" />
        <HubGameCard gameName="Strands" path="/strands" />
      </div>
    </div>
  );
}

export default HomeDashboard;
