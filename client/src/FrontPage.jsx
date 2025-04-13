import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import './FrontPage.css';

const TrafficVideo = () => {
  const [videoFiles, setVideoFiles] = useState([]);
  const [polaroidVideos, setPolaroidVideos] = useState([]);
  const [galleryVideos, setGalleryVideos] = useState([]);
  const [transformations, setTransformations] = useState([]);
  const [pileSize, setPileSize] = useState(10); // Default to 10 videos

  const fetchVideoFiles = async () => {
    try {
      const response = await fetch('/api/videos');
      const files = await response.json();
      console.log('Fetched video files with locations:', files); // Debugging
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
      const shuffledVideos = [...videoFiles].sort(() => Math.random() - 0.5).slice(0, pileSize);
      setPolaroidVideos(shuffledVideos);

      // Sort videos for the Gallery in ascending order
      const sortedVideos = [...videoFiles].sort();
      setGalleryVideos(sortedVideos);

      // Initialize random transformations for the Polaroid pile
      setTransformations(Array(shuffledVideos.length).fill(''));
    }
  }, [videoFiles, pileSize]); // Re-run when pileSize changes

  // Handle button click to trigger random transformations
  const handleShiftPile = () => {
    const newTransformations = transformations.map(() => {
      const randomX = Math.floor(Math.random() * 60) - 30; // Random X between -30px and 30px
      const randomY = Math.floor(Math.random() * 60) - 30; // Random Y between -30px and 30px
      const randomRotate = Math.floor(Math.random() * 21) - 10; // Random rotation between -10deg and 10deg

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

      {/* Slider to control the number of videos in the Polaroid pile */}
      <div className="slider-container">
        <label htmlFor="pileSizeSlider">Number of Videos in Polaroid Pile: {pileSize}</label>
        <input
          id="pileSizeSlider"
          type="range"
          min="1"
          max={videoFiles.length} // Limit to the total number of videos available
          value={pileSize}
          onChange={(e) => setPileSize(Number(e.target.value))} // Update pileSize immediately
        />
      </div>

      {/* Fullscreen Placeholder */}
      <div className="fullscreen-placeholder">
        {/* Main Polaroid on top of the stack */}
        {videoFiles.length > 0 && (
          <div className="main-polaroid-on-stack">
            <LazyLoad height={200} offset={100}>
              <video
                width="400"
                className="polaroid-video"
                controls
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={`/videos/133_video_20250403.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </LazyLoad>
            <p className="caption">Camera 133<br />Stoney Trail / Metis Trail NE</p>
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
              <LazyLoad height={200} offset={100}>
                <video
                  className="polaroid-video"
                  loop
                  muted
                  playsInline
                  controls // Always show controls
                >
                  <source src={`/videos/${video.filename}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </LazyLoad>
              <p className="caption">
                Camera {video.filename.replace(/\.[^/.]+$/, '')} <br />
                {video.location}
              </p>
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
            <LazyLoad height={200} offset={100}>
              <video
                className="polaroid-video"
                loop
                muted
                playsInline
                controls // Always show controls
              >
                <source src={`/videos/${video.filename}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </LazyLoad>
            <p className="caption">
              Camera {video.filename.replace(/\.[^/.]+$/, '')} <br />
              {video.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficVideo;