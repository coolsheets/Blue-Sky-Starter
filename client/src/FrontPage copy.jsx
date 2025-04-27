import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VideoReactionCard from "./component/VideoReactionCard.jsx";
import Login from "./component/Login.jsx";
import Register from "./component/Register.jsx";
import { Dialog, DialogContent } from "@mui/material";
import "./FrontPage.css";
import "./component/VideoReactionCard.css";

const FrontPage = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [topLikedVideos, setTopLikedVideos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Modal handlers
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

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
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/videos/top-liked")
      .then((res) => res.json())
      .then((data) => setTopLikedVideos(data))
      .catch((err) => console.error("Failed to fetch top liked videos:", err));
  }, []);

  return (
    <div className="front-page-container">
      <Navbar
        onLoginClick={handleLoginOpen}
        onLogoutClick={handleLogout}
        isLoggedIn={isLoggedIn}
      />

      <header className="title-picture">
        <img
          src="/img/calgary2.jpg"
          alt="Scenic Calgary"
          className="title-picture-image"
        />
        <div className="title-picture-text">
          <p>Explore City Time-Lapse</p>
          <h1>
            Choose <span> the best one</span>
          </h1>

          {isLoggedIn ? (
            <button onClick={handleOpenModal}>Vote</button>
          ) : (
            <button onClick={handleLoginOpen}>Login to Vote</button>
          )}
        </div>
      </header>

      <section className="video-preview">
        {topLikedVideos.map((video, index) => (
          <div key={video._id || index} className="video-card">
            <video
              src={`/videos/${video.filename}`}
              muted
              autoPlay
              loop
              playsInline
            />
          </div>
        ))}
      </section>

      {/* Vote Modal */}
      <Dialog
        open={open}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        classes={{ backdrop: "custom-dialog-backdrop" }}
      >
        <DialogContent className="custom-dialog-content">
          <VideoReactionCard />
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <Dialog
        open={loginOpen}
        onClose={handleCloseModals}
        maxWidth="xs"
        fullWidth
        classes={{ backdrop: "custom-dialog-backdrop" }}
      >
        <DialogContent className="custom-dialog-content">
          <Login
            onSuccess={handleCloseModals}
            switchToRegister={handleRegisterOpen}
          />
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog
        open={registerOpen}
        onClose={handleCloseModals}
        maxWidth="xs"
        fullWidth
        classes={{ backdrop: "custom-dialog-backdrop" }}
      >
        <DialogContent className="custom-dialog-content">
          <Register
            onSuccess={handleCloseModals}
            switchToLogin={handleLoginOpen}
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default FrontPage;
