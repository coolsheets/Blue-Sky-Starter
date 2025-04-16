import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import social media icons
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Blue Sky City Watchers</p>
        <div className="social-media-buttons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-button">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-button">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-button">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;