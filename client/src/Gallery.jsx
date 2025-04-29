import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import VideoReactionCard from "./component/VideoReactionCard";
import { Dialog, DialogContent } from "@mui/material";
import "./Gallery.css";

const Gallery = () => {
  const [videos, setVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // New states for filters/search/sort
  const [selectedQuadrant, setSelectedQuadrant] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading videos:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom && visibleCount < videos.length) {
        setVisibleCount((prev) => prev + 12);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, videos.length]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video.filename);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  // Apply filters, search, sort
  const filteredVideos = videos
    .filter((video) => {
      if (!selectedQuadrant) return true;
      return video.quadrant === selectedQuadrant;
    })
    .filter((video) =>
      video.camera_location.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "mostLiked") {
        return (b.stats?.likes || 0) - (a.stats?.likes || 0);
      }
      if (sortOption === "newest") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return 0;
    });

  return (
    <div className="gallery-page">
      {/* Filters / Search / Sort section */}
      <div className="gallery-controls">
        <select value={selectedQuadrant} onChange={(e) => setSelectedQuadrant(e.target.value)}>
          <option value="">All Quadrants</option>
          <option value="NW">NW</option>
          <option value="NE">NE</option>
          <option value="SW">SW</option>
          <option value="SE">SE</option>
        </select>

        <input
          type="text"
          placeholder="Search location..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="default">Default</option>
          <option value="mostLiked">Most Liked</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {loading && <div className="loading-indicator">Loading videos...</div>}

      <div className="gallery-container">
        {filteredVideos.slice(0, visibleCount).map((video, index) => (
          <div key={index} className="video-tile" onClick={() => handleVideoClick(video)}>
            <video
              ref={(el) => {
                if (el) {
                  el.play()
                    .then(() => {
                      setTimeout(() => {
                        el.pause();
                        el.currentTime = 0;
                      }, 1000);
                    })
                    .catch((err) => {
                      console.error("Autoplay failed:", err);
                    });
                }
              }}
              src={`/api/videos/${video.filename}`}
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
            <div className="video-info">
              #{video.camera_number} - {video.camera_location}
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredVideos.length && (
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
