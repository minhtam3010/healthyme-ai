import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Health from "./pages/Health";
import Header from "./components/global/Header";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/health" element={<Health />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
