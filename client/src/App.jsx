import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./FrontPage";
import Gallery from "./Gallery";
import SuperheroRegistry from "./SuperheroRegistry";
import TrafficVideo from "./TrafficVideo";
import Register from "./component/Register";
import Login from "./component/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;