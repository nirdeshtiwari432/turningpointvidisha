import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import "./NewMember.css";

const NewMember = () => {
  const { seatId, seatNo } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    seatId: seatNo || "",
    name: "",
    email: "",
    number: "",
    membershipType: "Regular",
    plan: "1 Month",
    shift: "Morning",
    fees: "",
    password: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      member: {
        name: formData.name,
        email: formData.email,
        number: formData.number,
        membershipType: formData.membershipType.toLowerCase(),
        plan: formData.plan.toLowerCase(),
        shift: formData.shift.toLowerCase(),
        fees: formData.fees,
        seat: formData.seatId,
        startDate: formData.startDate ? new Date(formData.startDate) : new Date(),
        endDate: formData.endDate ? new Date(formData.endDate) : new Date(),
      },
      pass: {
        password: formData.password,
      },
    };

    try {
      console.log(payload)
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Member booked successfully!");
        setTimeout(() => navigate("/admin/seats"), 1500);
      } else {
        setMessage(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardHeader>
      <div className="new-member-page-container">
        {/* Blue Themed Page Header */}
        <div className="page-header-section blue-theme">
          <div className="header-content">
            <h1 className="page-title">Add New Member</h1>
            <p className="page-subtitle">Register a new library member</p>
            <div className="header-icon">
              <i className="icon-user-plus">👤</i>
            </div>
          </div>
        </div>

        <div className="form-content-section">
          {message && (
            <div className={`message ${message.startsWith("✅") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <div className="form-card blue-theme-card">
            

            <form onSubmit={handleSubmit} className="member-form">
              {/* Basic Information Section */}
              <div className="form-section-group">
                <h4 className="section-title">Basic Information</h4>
                <div className="form-grid">
                  {/* Seat No */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">💺</span>
                      Seat No
                    </label>
                    <input
                      type="text"
                      name="seatId"
                      className="form-input"
                      value={formData.seatId}
                      onChange={handleChange}
                      placeholder="A-12"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">📧</span>
                      Email
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      className="form-input" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="jane.doe@example.com"
                    />
                  </div>

                  {/* Membership Type */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">🎫</span>
                      Membership Type
                    </label>
                    <select 
                      name="membershipType" 
                      className="form-select" 
                      value={formData.membershipType} 
                      onChange={handleChange} 
                    >
                      <option value="Regular">Regular</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Non_reserved">Non-reserved</option>
                    </select>
                  </div>

                  {/* Shift */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">⏰</span>
                      Shift
                    </label>
                    <select 
                      name="shift" 
                      className="form-select" 
                      value={formData.shift} 
                      onChange={handleChange}
                    >
                      <option value="Morning">Morning</option>
                      <option value="Night">Night</option>
                      <option value="Full">Full</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Personal Details Section */}
              <div className="form-section-group">
                <h4 className="section-title">Personal Details</h4>
                <div className="form-grid">
                  {/* Full Name */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">👤</span>
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      className="form-input" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Jane Doe"
                      required 
                    />
                  </div>

                  {/* Contact */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">📱</span>
                      Contact
                    </label>
                    <input 
                      type="text" 
                      name="number" 
                      className="form-input" 
                      value={formData.number} 
                      onChange={handleChange} 
                      placeholder="+1 (555) 123-4567"
                      required 
                    />
                  </div>

                  {/* Password */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">🔒</span>
                      Password
                    </label>
                    <input 
                      type="password" 
                      name="password" 
                      className="form-input" 
                      value={formData.password} 
                      onChange={handleChange} 
                      placeholder="Enter password"
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Membership Details Section */}
              <div className="form-section-group">
                <h4 className="section-title">Membership Details</h4>
                <div className="form-grid">
                  {/* Plan */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">📅</span>
                      Plan
                    </label>
                    <select 
                      name="plan" 
                      className="form-select" 
                      value={formData.plan} 
                      onChange={handleChange} 
                    >
                      <option value="1 Month">1 Month</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                      <option value="1 Year">1 Year</option>
                    </select>
                  </div>

                  {/* Fees */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">💰</span>
                      Fees
                    </label>
                    <div className="fees-input-container">
                      <span className="currency-symbol">₹</span>
                      <input 
                        type="number" 
                        name="fees" 
                        className="form-input fees-input" 
                        value={formData.fees} 
                        onChange={handleChange} 
                        placeholder="50.00"
                        required 
                      />
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">📆</span>
                      Start Date
                    </label>
                    <input 
                      type="date" 
                      name="startDate" 
                      className="form-input" 
                      value={formData.startDate} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>

                  {/* End Date */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">📆</span>
                      End Date
                    </label>
                    <input 
                      type="date" 
                      name="endDate" 
                      className="form-input" 
                      value={formData.endDate} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="form-buttons">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => navigate("/admin/seats")}
                >
                  <span className="btn-icon">←</span>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="btn-spinner"></span>
                      Adding Member...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">✓</span>
                      Add Member
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardHeader>
  );
};

export default NewMember;