import React, { useState, useEffect } from 'react';
import './FrontPage.css';

const TrafficVideo = () => {
  // State to store all video filenames
  const [videoFiles, setVideoFiles] = useState([]);
  // State to store randomized videos for the Polaroid pile
  const [polaroidVideos, setPolaroidVideos] = useState([]);
  // State to store sorted videos for the Gallery
  const [galleryVideos, setGalleryVideos] = useState([]);
  // State to store random transformations for each polaroid
  const [transformations, setTransformations] = useState([]);

  // Fetch video files dynamically
  const fetchVideoFiles = async () => {
    try {
      const response = await fetch('/api/videos');
      const files = await response.json();
      console.log('Fetched video files:', files); // Debugging
      setVideoFiles(files);
    } catch (error) {
      console.error('Error fetching video files:', error);
    }
  };

  useEffect(() => {
    // Fetch video files on component mount
    fetchVideoFiles();
  }, []);

  useEffect(() => {
    if (videoFiles.length > 0) {
      // Randomize videos for the Polaroid pile
      const shuffledVideos = [...videoFiles].sort(() => Math.random() - 0.5).slice(0, 10);
      setPolaroidVideos(shuffledVideos);

      // Sort videos for the Gallery in ascending order
      const sortedVideos = [...videoFiles].sort();
      setGalleryVideos(sortedVideos);

      // Initialize random transformations for the Polaroid pile
      setTransformations(Array(shuffledVideos.length).fill(''));
    }
  }, [videoFiles]);

  // Handle button click to trigger random transformations
  const handleShiftPile = () => {
    const newTransformations = transformations.map(() => {
      const randomX = Math.floor(Math.random() * 460) - 330; // Random X between -30px and 30px
      const randomY = Math.floor(Math.random() * 460) - 330; // Random Y between -30px and 30px
      const randomRotate = Math.floor(Math.random() * 21) - 15; // Random rotation between -5deg and 5deg

      return `rotate(${randomRotate}deg) translate(${randomX}px, ${randomY}px)`;
    });

    setTransformations(newTransformations);
  };

  return (
    <div className="app-container">
      {/* Nav Bar */}
      <nav className="navbar">
        <div className="navbar-left">Blue Sky City Watchers</div>
        <div className="navbar-right">
          <div className="nav-placeholder" />
          <div className="nav-placeholder" />
          <div className="nav-placeholder" />
        </div>
      </nav>

      {/* Fullscreen Placeholder */}
      <div className="fullscreen-placeholder">
        {/* Main Polaroid on top of the stack */}
        {videoFiles.length > 0 && (
          <div className="main-polaroid-on-stack">
            <video
              className="polaroid-video"
              controls
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={`/videos/${videoFiles[0]}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="caption">Main Snapshot</p>
          </div>
        )}

        {/* Polaroid pile underneath */}
        <div className="polaroid-pile">
          {polaroidVideos.map((video, i) => (
            <div
              className={`pile-polaroid pile-${i}`}
              key={i}
              style={{ transform: transformations[i] }}
            >
              <video
                className="polaroid-video"
                controls
                loop
                muted
                playsInline
              >
                <source src={`/videos/${video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="caption">Snapshot {i + 1}</p>
            </div>
          ))}
        </div>

        {/* Button to trigger the random shift animation */}
        <button className="shift-button" onClick={handleShiftPile}>
          Shift Pile
        </button>
      </div>

      {/* Polaroid-style Gallery */}
      <div className="gallery">
        {galleryVideos.map((video, i) => (
          <div className="polaroid" key={i}>
            <video
              className="polaroid-video"
              controls
              loop
              muted
              playsInline
            >
              <source src={`/videos/${video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="caption">Snapshot {i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficVideo;