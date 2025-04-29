import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "./Navbar.css";

const Navbar = ({ onLoginClick, onLogoutClick, isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false); // Close menu when a link is clicked
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="https://www.visitcalgary.com/" target="_blank" rel="noopener noreferrer">
          <img src="/img/viewsLogo.svg" alt="Views of Calgary Logo" className="views-logo" />
        </a>
      </div>

      <div className="menu-icon" onClick={handleToggleMenu}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={handleLinkClick}>Home</Link>
        <Link to="/gallery" onClick={handleLinkClick}>Gallery</Link>
        {!isLoggedIn ? (
          <button className="navbar-login-button" onClick={() => { onLoginClick(); handleLinkClick(); }}>
            Login
          </button>
        ) : (
          <button className="navbar-login-button" onClick={() => { onLogoutClick(); handleLinkClick(); }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
