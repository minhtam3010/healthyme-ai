import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/register/Registration";
import Health from "./components/health/Health";
import Header from "./components/global/Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Registration />} />
          <Route path="/health" element={<Health />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
