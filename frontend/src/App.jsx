import { Routes, Route } from "react-router";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>);
}

export default App;
