import { Link } from "react-router-dom";
import GameInput from "../components/GameInput";
import DashboardButton from "../components/DashboardButton";

function HomeDashboard() {
  return (
    <>
      <h1>Your NYT Games Dashboard</h1>
      <GameInput />

      <Link to="/connections">
        <DashboardButton name="Connections" />
      </Link>
      <Link to="/strands">
        <DashboardButton name="Strands" />
      </Link>
    </>
  );
}

export default HomeDashboard;
