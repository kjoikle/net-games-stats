import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeDashboard from "./pages/HomeDashboard";
import ConnectionsDashboard from "./pages/ConnectionsDashboard";
import StrandsDashboard from "./pages/StrandsDashboard";
import Missing from "./pages/Missing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/connections" element={<ConnectionsDashboard />} />
        <Route path="/strands" element={<StrandsDashboard />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
