import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Link the extracted CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Blue Sky City Watchers</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <a href="#">Map</a>
      </div>
    </nav>
  );
};

export default Navbar;