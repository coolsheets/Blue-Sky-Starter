import React, { useState } from 'react';
import './FrontPage.css';

const TrafficVideo = () => {
  // State to store random transformations for each polaroid
  const [transformations, setTransformations] = useState(Array(10).fill(""));

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
        <div className="main-polaroid-on-stack">
          <video
            className="polaroid-video"
            controls
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="./videos/output_2x_looped.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="caption">Main Snapshot</p>
        </div>

        {/* Polaroid pile underneath */}
        <div className="polaroid-pile">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              className={`pile-polaroid pile-${i}`}
              key={i}
              style={{ transform: transformations[i] }}
            >
              <video
                className="polaroid-video"
                controls
                // autoPlay
                loop
                muted
                playsInline
              >
                <source src="./videos/output_2x_looped.mp4" type="video/mp4" />
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
        {Array.from({ length: 9 }).map((_, i) => (
          <div className="polaroid" key={i}>
            <video
              className="polaroid-video"
              controls
              // autoPlay
              loop
              muted
              playsInline
            >
              <source src="./videos/output_2x_looped.mp4" type="video/mp4" />
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