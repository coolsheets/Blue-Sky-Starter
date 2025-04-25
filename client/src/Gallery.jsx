import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import "./Gallery.css";

const Gallery = () => {
  const videosPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [videoFiles, setVideoFiles] = useState([]);

  useEffect(() => {
    const files = [];
    for (let i = 1; i <= 204; i++) {
      const filename = String(i).padStart(3, "0") + ".mp4";
      files.push(filename);
    }
    setVideoFiles(files);
  }, []);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videoFiles.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videoFiles.length / videosPerPage);

  return (
    <div className="gallery-page">
      <div className="gallery-container">
        {currentVideos.map((file, index) => (
          <div key={index} className="video-tile">
            <video
              src={`/videos/${file}`}
              muted
              loop
              playsInline
              preload="metadata"
              poster={`/videos/${file}#t=0.1`}
              onMouseOver={(e) => e.target.play()}
              onMouseOut={(e) => {
                e.target.pause();
                e.target.currentTime = 0;
              }}
            />
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;