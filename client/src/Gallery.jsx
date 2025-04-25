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
  const [loading, setLoading] = useState(true); // New loading state

  // Load from MongoDB
  useEffect(() => {
    fetch("/api/videos") // Use relative URL
      .then((res) => res.json())
      .then((data) => {
        const filenames = data.map((video) => video.filename);
        setVideoFiles(filenames);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.error("Error loading videos:", err);
        setLoading(false); // Set loading to false even if there's an error
      });
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
      {loading && <div className="loading-indicator">Loading videos...</div>}
      <div className="gallery-container">
        {videoFiles.slice(0, visibleCount).map((file, index) => (
          <div
            key={index}
            className="video-tile"
            onClick={() => handleVideoClick(file)}
          >
            <video
              ref={(el) => {
                if (el) {
                  el.play()
                    .then(() => {
                      setTimeout(() => {
                        el.pause();
                        el.currentTime = 0;
                      }, 1000); // ⏱️ pause after 1 sec
                    })
                    .catch((err) => {
                      console.error("Autoplay failed:", err);
                    });
                }
              }}
              src={`/api/videos/${file}`} // Updated to use the backend API route
              muted
              playsInline
              preload="auto"
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
          <VideoReactionCard videoUrl={`/api/videos/${selectedVideo}`} />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;