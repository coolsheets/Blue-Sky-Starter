import React from "react";
import "./Navbar.css"; // Link the extracted CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Blue Sky City Watchers</div>
      <div className="navbar-links">
        <a href="#">Home</a>
        <a href="#">Gallery</a>
        <a href="#">Map</a>
      </div>
    </nav>
  );
};

export default Navbar;