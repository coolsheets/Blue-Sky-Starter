import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Gallery.css";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 20;

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [videoList, setVideoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  useEffect(() => {
    // Grab all video filenames based on pattern
    const allVideos = [];
    for (let i = 1; i <= 204; i++) {
      const padded = String(i).padStart(3, "0");
      const filename = `${padded}.mp4`;
      allVideos.push(filename);
    }

    setVideoList(allVideos);
  }, []);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedVideos = videoList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(videoList.length / ITEMS_PER_PAGE);

  return (
    <div className="gallery-container">
      <Navbar />
      <div className="gallery-content">
        {paginatedVideos.map((file, index) => (
          <div className="gallery-item" key={index}>
            <video
              src={`/videos/${file}`}
              muted
              loop
              preload="metadata"
              onMouseOver={e => e.target.play()}
              onMouseOut={e => e.target.pause()}
              poster={`/img/video-placeholder.jpg`} // fallback if needed
            />
          </div>
        ))}
      </div>

      <div className="gallery-pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          ← Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next →
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;