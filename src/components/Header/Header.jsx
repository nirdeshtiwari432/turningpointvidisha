import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleProfileClick = () => {
    if (!user) {
      // Not logged in → go to login
      navigate("/login");
      return;
    }

    // Check role and redirect accordingly
    
    if (user.role === "admin") {
      navigate("/dashboard"); // Admin dashboard
    } else {
      navigate("/user/profile"); // Normal user profile
    }
  };

  const handleLibraryClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "library" } });
    } else {
      const section = document.getElementById("library-section");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h2>Turning Point</h2>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/membership">Membership</Link></li>
            <li><a href="#library" onClick={handleLibraryClick}>Library</a></li>

            {/* Admin Only Links */}
            {user?.role === "admin" && (
              <>
                
                <li><Link to="/alerts">Alerts</Link></li>
              </>
            )}

            <li>
              <button className="join-btn" onClick={handleProfileClick}>
                Profile
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
