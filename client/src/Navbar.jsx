import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Link the extracted CSS

const Navbar = ({onLoginClick, onLogoutClick, isLoggedIn}) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="https://www.visitcalgary.com/" target="_blank" rel="noopener noreferrer">
          <img src="/img/viewsLogo.svg" alt="Views of Calgary Logo" className="views-logo" />
        </a>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        {!isLoggedIn ? (
          <button className="navbar-login-button" onClick={onLoginClick}>
            Login
          </button>
        ) : (
          <button className="navbar-login-button" onClick={onLogoutClick}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
