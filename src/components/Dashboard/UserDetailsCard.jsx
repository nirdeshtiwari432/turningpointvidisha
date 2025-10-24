import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDetailsCard.css"
const UserDetailsCard = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("contact");

  // ✅ Mark user as new if startDate is missing
  const isNewUser = !user.startDate;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${user._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("User deleted successfully.");
        navigate("/members");
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting user.");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Turning Point</h2>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-item active">Dashboard</div>
            <div className="nav-item active">Members</div>
          </div>
          
          <div className="user-profile-section">
            <div className="user-avatar">
              <img
                src={user.profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="avatar-img"
              />
            </div>
            <h3 className="user-name">{user.name}</h3>
            <p className="user-id">Member ID: {user._id}</p>
            <p className="join-date">Joined: {user.startDate ? new Date(user.startDate).toLocaleDateString("en-GB") : "N/A"}</p>
          </div>

          <div className="nav-section">
            <div className="nav-item">New Member</div>
            <div className="nav-item">Settings</div>
            <div className="nav-item">Support</div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <h1>Member Details</h1>
          {isNewUser && <span className="new-badge">New User</span>}
        </div>

        {/* Tab Navigation - Only Contact Info and Membership */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => setActiveTab("contact")}
          >
            Contact Info
          </button>
          <button 
            className={`tab-btn ${activeTab === "membership" ? "active" : ""}`}
            onClick={() => setActiveTab("membership")}
          >
            Membership
          </button>
          <div className="user-actions">
              <button 
                className="btn-edit-profile"
                onClick={() => navigate(`/members/${user._id}/edit`)}
              >
                Edit Profile
              </button>
              <button className="btn-deactivate" onClick={handleDelete}>
                Delete
              </button>
            </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          <div className="profile-image">
                   <img
                        src={user.profilePic || "https://via.placeholder.com/150"}
                        alt="Profile"
                   />
          </div>
          <br />  
          {activeTab === "contact" && (
            <div className="contact-info">
              <div className="info-card">
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{user.number || "N/A"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{user.email || "N/A"}</span>
                </div>
                
              </div>
            </div>
          )}

          {activeTab === "membership" && (
            <div className="membership-info">
              <div className="info-grid">
                <div className="info-card">
                  <h4>Membership Details</h4>
                  <div className="info-item">
                    <span className="info-label">Membership Type</span>
                    <span className="info-value">{user.membershipType || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Plan</span>
                    <span className="info-value">{user.plan || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Shift</span>
                    <span className="info-value">{user.shift || "N/A"}</span>
                  </div>
                </div>

                <div className="info-card">
                  <h4>Financial Details</h4>
                  <div className="info-item">
                    <span className="info-label">Fees</span>
                    <span className="info-value">{user.fees ? `₹${user.fees}` : "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Seat</span>
                    <span className="info-value">{user.seat?.seatNo || "N/A"}</span>
                  </div>
                </div>

                <div className="info-card">
                  <h4>Date Information</h4>
                  <div className="info-item">
                    <span className="info-label">Start Date</span>
                    <span className="info-value">
                      {user.startDate ? new Date(user.startDate).toLocaleDateString("en-GB") : "N/A"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">End Date</span>
                    <span className="info-value">
                      {user.endDate ? new Date(user.endDate).toLocaleDateString("en-GB") : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;