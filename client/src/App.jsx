import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./FrontPage";
import Gallery from "./Gallery";
import SuperheroRegistry from "./SuperheroRegistry";
import TrafficVideo from "./TrafficVideo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
};

export default App;