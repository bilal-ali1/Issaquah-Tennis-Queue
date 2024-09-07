import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span role="img" aria-label="tree">🎾</span> ParkCourtFinder
      </div>
      {/* <input type="text" placeholder="Search for parks or courts" className="search-input" /> */}
    </nav>
  );
}

export default Navbar;