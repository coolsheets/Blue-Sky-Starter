import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onLoginClick, onLogoutClick, isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Blue Sky City Watchers</div>
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
