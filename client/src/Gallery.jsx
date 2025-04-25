import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import VideoReactionCard from "./component/VideoReactionCard";
import { Dialog, DialogContent } from "@mui/material";
import "./Gallery.css";

const Gallery = () => {
  const [videoFiles, setVideoFiles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Load from MongoDB
  useEffect(() => {
    fetch("http://localhost:3000/api/videos")
      .then((res) => res.json())
      .then((data) => {
        const filenames = data.map((video) => video.filename);
        setVideoFiles(filenames);
      })
      .catch((err) => console.error("Error loading videos:", err));
  }, []);

  // Lazy loading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100;
      if (bottom && visibleCount < videoFiles.length) {
        setVisibleCount((prev) => prev + 12);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, videoFiles.length]);

  const handleVideoClick = (file) => {
    setSelectedVideo(file);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-container">
        {videoFiles.slice(0, visibleCount).map((file, index) => (
          <div
            key={index}
            className="video-tile"
            onClick={() => handleVideoClick(file)}
          >
            <video
              src={`/videos/${file}`}
              muted
              loop
              playsInline
              preload="metadata"
              poster={`/videos/${file}#t=0.1`}
              onMouseOver={async (e) => {
                try {
                  await e.target.play();
                } catch (err) {}
              }}
              onMouseOut={(e) => {
                try {
                  e.target.pause();
                  e.target.currentTime = 0;
                } catch (err) {}
              }}
            />
          </div>
        ))}
      </div>

      {visibleCount < videoFiles.length && (
        <div className="loading-indicator">Loading more videos...</div>
      )}

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        classes={{ backdrop: "custom-dialog-backdrop" }}
      >
        <DialogContent className="custom-dialog-content">
          <VideoReactionCard videoUrl={selectedVideo} />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;