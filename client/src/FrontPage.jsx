import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VideoReactionCard from "./component/VideoReactionCard.jsx";
import { Dialog, DialogContent } from "@mui/material";
import "./FrontPage.css";
import "./component/VideoReactionCard.css";

const FrontPage = () => {
  const [open, setOpen] = useState(false);
  const [topLikedVideos, setTopLikedVideos] = useState([]);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  // Fetch top liked videos on mount
  useEffect(() => {
    fetch("http://localhost:3000/api/videos/top-liked")
      .then((res) => res.json())
      .then((data) => setTopLikedVideos(data))
      .catch((err) => console.error("Failed to fetch top liked videos:", err));
  }, []);

  return (
    <div className="front-page-container">
      <Navbar />

      <header className="title-picture">
        <img
          src="/img/calgary2.jpg"
          alt="Scenic Calgary"
          className="title-picture-image"
        />
        <div className="title-picture-text">
          <p>Explore City timelaps</p>
          <h1>
            Choose <span> the best one</span>
          </h1>
          <button onClick={handleOpenModal}>Vote</button>
        </div>
      </header>

      {/* Show only the 3 videos, no reaction cards */}
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

      {/* Keep modal for Vote button (VideoReactionCard inside) */}
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

      <Footer />
    </div>
  );
};

export default FrontPage;