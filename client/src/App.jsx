import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./FrontPage";
import Gallery from "./Gallery";
import TrafficVideo from "./TrafficVideo";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Login from "./component/Login";
import Register from "./component/Register";
import { Dialog, DialogContent } from "@mui/material";
import "./component/VideoReactionCard.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  // Check token + timestamp on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginTime = parseInt(localStorage.getItem("loginTime"), 10);
    const now = Date.now();

    if (token && loginTime) {
      const hoursPassed = (now - loginTime) / (1000 * 60 * 60);
      if (hoursPassed >= 4) {
        handleLogout();
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Periodically auto-logout expired token (every 60s)
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      const loginTime = parseInt(localStorage.getItem("loginTime"), 10);
      const now = Date.now();

      if (token && loginTime) {
        const hoursPassed = (now - loginTime) / (1000 * 60 * 60);
        if (hoursPassed >= 4) {
          handleLogout();
        }
      }
    }, 60 * 1000); // every 60s

    return () => clearInterval(interval);
  }, []);

  const handleLoginOpen = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const handleCloseModals = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
    localStorage.setItem("loginTime", Date.now().toString()); // 🕒 Save login timestamp
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar
        onLoginClick={handleLoginOpen}
        onLogoutClick={handleLogout}
        isLoggedIn={isLoggedIn}
      />

      <Routes>
        <Route
          path="/"
          element={
            <FrontPage
              isLoggedIn={isLoggedIn}
              onLogin={handleLoginOpen}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/gallery"
          element={
            <Gallery
              isLoggedIn={isLoggedIn}
              onLogin={handleLoginOpen}
              onLogout={handleLogout}
            />
          }
        />
        <Route path="/video" element={<TrafficVideo />} />
      </Routes>

      <Dialog open={loginOpen} onClose={handleCloseModals} maxWidth="xs" fullWidth>
        <DialogContent className="custom-dialog-content">
          <Login
            onSuccess={handleCloseModals}
            switchToRegister={handleRegisterOpen}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={registerOpen} onClose={handleCloseModals} maxWidth="xs" fullWidth>
        <DialogContent className="custom-dialog-content">
          <Register
            onSuccess={handleCloseModals}
            switchToLogin={handleLoginOpen}
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </Router>
  );
};

export default App;
