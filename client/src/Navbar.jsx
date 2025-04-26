import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Link the extracted CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="branding-container">
          <div className="text-section">
            <div className="views-of">Views of</div>
            <a href="https://www.visitcalgary.com/" target="_blank">
              <div className="calgary">Calgary</div>
            </a>
          </div>
          <div className="sun-and-slogan">
            <svg className="sun-icon" viewBox="0 0 24 24" fill="#FFDA24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" />
              <g stroke="#FFDA24" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
              </g>
            </svg>
            <div className="blue-sky-city">
              BLUE<br />SKY<br />CITY
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <a href="#">Map</a>
      </div>
    </nav>
  );
};

export default Navbar;
