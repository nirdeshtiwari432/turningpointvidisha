import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // We will create this file next

// Accept both isOpen and onMenuToggle as props
const Sidebar = ({ isOpen, onMenuToggle }) => {
  
  // This logic adds the "is-open" class ONLY when isOpen is true
  const sidebarClassName = isOpen ? "sidebar is-open" : "sidebar";

  return (
    <nav className={sidebarClassName}>
      <div className="sidebar-header">
        <h3>Menu</h3>
        {/* This button will call the toggle function from App.js to close itself */}
        <button className="sidebar-close-btn" onClick={onMenuToggle}>
          &times; {/* This is a simple 'X' icon */}
        </button>
      </div>

      <ul className="sidebar-links">
        {/* We add all the links from your header for a complete mobile menu */}
        {/* Add an onClick={onMenuToggle} to each link so the menu closes when you tap one */}
        
        <li><Link to="/" onClick={onMenuToggle}>Home</Link></li>
        <li><Link to="/about" onClick={onMenuToggle}>About</Link></li>
        <li><Link to="/membership" onClick={onMenuToggle}>Membership</Link></li>
        
        {/* You can add logic here to show/hide admin links */}
        {/* For now, I'll just add the ones from your header */}
        <li><Link to="/seats" onClick={onMenuToggle}>Seats</Link></li>
        <li><Link to="/alerts" onClick={onMenuToggle}>Alerts</Link></li>
        
        <li className="sidebar-profile-link">
          <Link to="/user/profile" onClick={onMenuToggle} className="sidebar-profile-btn">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;