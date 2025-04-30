import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer";
import VideoReactionCard from "./component/VideoReactionCard.jsx";
import { Dialog, DialogContent } from "@mui/material"; // ✅ needed for Vote modal
import "./FrontPage.css";
import "./component/VideoReactionCard.css";

const FrontPage = ({ isLoggedIn, onLogin, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [topLikedVideos, setTopLikedVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedVideoUrl(null);
  };

  useEffect(() => {
    fetch("/api/videos/top-liked")
      .then((res) => res.json())
      .then((data) => setTopLikedVideos(data))
      .catch((err) => console.error("Failed to fetch top liked videos:", err));
  }, []);

  return (
    <div className="front-page-container">
      <Navbar
        onLoginClick={onLogin}
        onLogoutClick={onLogout}
        isLoggedIn={isLoggedIn}
      />

      <header className="title-picture">
        <img
          src="/img/calgary2.jpg"
          alt="Scenic Calgary"
          className="title-picture-image"
        />
        <div className="title-picture-text">
          <h3>Explore City Time-Lapse</h3>
          <h1>Choose your favourites</h1>

          {isLoggedIn ? (
            <button
              onClick={() => {
                setSelectedVideoUrl(null);
                setOpen(true);
              }}
            >
              Vote
            </button>
          ) : (
            <button onClick={onLogin}>Login to Vote</button>
          )}
        </div>
      </header>

      <section className="video-preview">
        {topLikedVideos.map((video, index) => (
          <div
            key={video._id || index}
            className="video-card"
            onClick={() => {
              setSelectedVideoUrl(`/api/videos/${video.filename}`);
              setOpen(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <video
              src={`/api/videos/${video.filename}`}
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
          <VideoReactionCard videoUrl={selectedVideoUrl} />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default FrontPage;
