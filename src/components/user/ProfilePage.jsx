import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css"; // We'll create this CSS file

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/user/profile", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10 MB!");
      e.target.value = null;
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await fetch("http://localhost:5000/user/upload-photo", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile photo updated successfully!");
        setUser((prev) => ({ ...prev, profilePic: data.imageUrl }));
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading");
    }
  };

  const handlePaymentClick = () => navigate("/membership");

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        alert(data.message || "Logout failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during logout");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>
        
        <div className="profile-content">
          {/* Left Side - Photo Upload */}
          <div className="photo-section">
            <div className="photo-upload">
              <h3>Upload a photo</h3>
              <div className="photo-preview">
                <img
                  src={user.profilePic || "/default-avatar.png"}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
              <div className="upload-controls">
                <input 
                  type="file" 
                  id="file-input"
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="file-input"
                />
                <label htmlFor="file-input" className="file-label">
                  Choose File
                </label>
                <button className="upload-btn" onClick={handleUpload}>
                  Upload Photo
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Profile Details */}
          <div className="details-section">
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Name</span>
                <span className="detail-value">{user.name}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Number</span>
                <span className="detail-value phone-number">+91 {user.number}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Plan</span>
                <span className="detail-value">{user.plan}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Start Date</span>
                <span className="detail-value">{user.startDate?.slice(0, 10) || "-"}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Seat</span>
                <span className="detail-value">{user.seat?.seatNo || "-"}</span>
              </div>

              
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value email">{user.email || "Not provided"}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Membership Type</span>
                <span className="detail-value">{user.membershipType}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Shift</span>
                <span className="detail-value">{user.shift}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">End Date</span>
                <span className="detail-value">{user.endDate?.slice(0, 10) || "-"}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Fees Paid</span>
                <span className="detail-value fee-amount">{user.fees || "-"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {!user.feeStatus && (
            <button className="pay-btn" onClick={handlePaymentClick}>
              Pay Membership
            </button>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;