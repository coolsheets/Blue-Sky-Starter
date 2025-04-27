import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import social media icons
import "./Footer.css";

const Footer = () => {
  const [hover, setHover] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div
          className="hover-container"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p>© 2025 Blue Sky City Reactive</p>
          <div className={`hover-popout ${hover ? "visible" : ""}`}>
            You may notice a subtle difference in our colours versus the official Blue Sky City branding. We have intentionally chosen shades inspired by the Ukrainian flag 🇺🇦 <br/><br/>A quiet but heartfelt expression of solidarity with all those fighting for freedom.
          </div>
        </div>
        <div className="social-media-buttons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
