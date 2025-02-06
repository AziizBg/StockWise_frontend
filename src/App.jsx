// src/App.jsx
import React from "react";
import Simulation from "./pages/Simulation";
import "./App.css";
import TopBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Review from "./pages/Review";

function App() {
  return (
    <div className="p-0 m-0 w-100">
      <TopBar />
      <div className="p-5">
        <Routes>
          {/* <Route path="/" element={<Review />} />
            <Route path="/simulation" element={<Simulation />} /> */}
          <Route path="/" element={<Simulation />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
