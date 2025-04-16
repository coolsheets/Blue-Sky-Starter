import React from "react";
import Navbar from "./Navbar";
import "./FrontPage.css";
import Footer from "./Footer";

const FrontPage = () => {
  const videoFiles = [
    "003.mp4",
    "006.mp4",
    "009.mp4"
  ];

  return (
    <div className="front-page-container">
      {/* Navbar */}
      <Navbar />

      {/* Title Picture Section */}
      <header className="title-picture">
        <img src="/img/calgary2.jpg" alt="Scenic Calgary" className="title-picture-image" />
        <div className="title-picture-text">
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
      <Footer />
    </div>
  );
};

export default FrontPage;