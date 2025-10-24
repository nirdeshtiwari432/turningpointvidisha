import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DashboardHeader.css"

const DashboardHeader = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        navigate("/login");
      } else {
        alert("Logout failed. Try again.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Check console.");
    }
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard" },
    {path :"/admin/transactions",label:"Transactions"},
    { path: "/members", label: "Member Details" },
    { path: "/unpaid", label: "Unpaid Member" },
    { path: "/plan", label: "Plan" },
    { path: "/seats", label: "Seat Details" },
    { path: "/admin/alert",label:"Alert"},
    
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      {/* Sidebar for desktop */}
      <div className="sidebar bg-dark d-none d-md-block">
        <div className="d-flex flex-column p-3 text-white min-vh-100">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4">Library Admin</span>
          </a>
          <ul className="nav nav-pills flex-column mb-auto mt-4">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <button
                  className={`nav-link text-white w-100 text-start ${isActive(item.path) ? "active" : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-top pt-3 mt-auto">
            <button className="btn btn-outline-light w-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main className="main-content">
        {/* Top bar for mobile */}
        <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom px-4 d-md-none">
          <button
            className="btn btn-dark"
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h5 className="mb-0">Admin Dashboard</h5>
        </div>
        
        {/* Page content */}
        <div className="main-content-wrapper">
          {children}
        </div>
      </main>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div className="mobile-sidebar-overlay">
            <div className="d-flex flex-column p-3 bg-dark text-white h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-4">Library Admin</span>
                <button className="btn btn-dark" onClick={() => setSidebarOpen(false)}>
                  ×
                </button>
              </div>
              <ul className="nav nav-pills flex-column mb-auto mt-4">
                {menuItems.map((item) => (
                  <li key={item.path} className="nav-item">
                    <button
                      className={`nav-link text-white w-100 text-start ${isActive(item.path) ? "active" : ""}`}
                      onClick={() => {
                        navigate(item.path);
                        setSidebarOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-top pt-3 mt-auto">
                <button className="btn btn-outline-light w-100" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div
            className="mobile-sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default DashboardHeader;