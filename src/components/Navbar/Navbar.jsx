import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleProfileClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role === "admin") navigate("/dashboard");
    else navigate("/user/profile");
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
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h2 onClick={() => navigate("/")}>Turning Point</h2>
        </div>

        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/membership" onClick={() => setMenuOpen(false)}>Membership</Link>
          <a
  href="#library"
  onClick={(e) => {
    handleLibraryClick(e);
    setMenuOpen(false);
  }}
>
  Library
</a>

          {/* <a href="#library" onClick={handleLibraryClick => setMenuOpen(false)}>Library</a> */}
          <Link to="/alerts" onClick={() => setMenuOpen(false)}>Alerts</Link>

          {user?.role === "admin" && (
            <>
              <Link to="/seats" onClick={() => setMenuOpen(false)}>Seats</Link>
            </>
          )}
{/* Admin Only Links */}
            {(user?.role === "admin" || user?.role === "user") && (
              <>
              <li>
              <button className="join-btn" onClick=
              {(e) => {
    handleProfileClick();
    setMenuOpen(false);
  }}>
                Profile
              </button>
              </li>
              </>
            )}
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
