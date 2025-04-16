import React from "react";
import "./FrontPage.css";

const FrontPage = () => {
  const videoFiles = [
    "003.mp4",
    "006.mp4",
    "009.mp4"
  ];

  return (
    <div className="front-page-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">Blue Sky City Watchers</div>
        <div className="navbar-links">
          <a href="#">Home</a>
          <a href="#">Gallery</a>
          <a href="#">Map</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <img src="/img/calgary2.jpg" alt="Scenic Calgary" className="hero-image" />
        <div className="hero-text">
          <p>Explore City timelaps</p>
          <h1>Choose <span> the best one</span></h1>
          <button>Vote</button>
        </div>
      </header>

      {/* Video Thumbnails */}
      <section className="video-preview">
        {videoFiles.map((file, index) => (
          <div key={index} className="video-card">
            <video src={`/videos/${file}`} muted loop autoPlay />
          </div>
        ))}
      </section>
    </div>
  );
};

export default FrontPage;