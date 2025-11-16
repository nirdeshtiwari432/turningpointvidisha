import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import "./NewMember.css";

const NewMember = () => {
  const { seatId, seatNo } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    seatId: seatId || "",
    seatNo: seatNo || "",
    name: "",
    email: "",
    number: "",
    membershipType: "reserved",
    plan: "full_time",
    shift: "morning",
    fees: "",
    password: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Auto-clear message after a few seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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
        name: formData.name.trim(),
        email: formData.email.trim(),
        number: formData.number.trim(),
        membershipType: formData.membershipType.toLowerCase(),
        plan: formData.plan.toLowerCase(),
        shift: formData.shift.toLowerCase(),
        fees: Number(formData.fees),
        seat: formData.seatId,
        startDate: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : new Date().toISOString(),
        endDate: formData.endDate
          ? new Date(formData.endDate).toISOString()
          : new Date().toISOString(),
      },
      pass: {
        password: formData.password,
      },
    };

    try {
      console.log("Submitting Payload:", payload);

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
      console.error("Error:", error);
      setMessage("❌ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardHeader>
      <div className="new-member-page-container">
        {/* Page Header */}
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
            <div
              className={`message ${
                message.startsWith("✅") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          <div className="form-card blue-theme-card">
            <form onSubmit={handleSubmit} className="member-form">
              {/* Basic Information */}
              <div className="form-section-group">
                <h4 className="section-title">Basic Information</h4>
                <div className="form-grid">
                  {/* Seat No */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">💺</span> Seat No
                    </label>
                    <input
                      type="text"
                      name="seatNo"
                      className="form-input"
                      value={formData.seatNo}
                      onChange={handleChange}
                      placeholder="A-12"
                      required
                    />
                  </div>

                  {/* Hidden Seat ID */}
                  <div className="form-section" hidden>
                    <input
                      type="text"
                      name="seatId"
                      className="form-input"
                      value={formData.seatId}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">📧</span> Email
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
                      <span className="label-icon">🎫</span> Membership Type
                    </label>
                    <select
                      name="membershipType"
                      className="form-select"
                      value={formData.membershipType}
                      onChange={handleChange}
                    >
                      
                      <option value="reserved">Reserved</option>
                      <option value="non_reserved">Non-reserved</option>
                    </select>
                  </div>

                  {/* Shift */}
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">⏰</span> Shift
                    </label>
                    <select
                      name="shift"
                      className="form-select"
                      value={formData.shift}
                      onChange={handleChange}
                    >
                      <option value="morning">Morning</option>
                      <option value="night">Night</option>
                      <option value="full_time">Full</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="form-section-group">
                <h4 className="section-title">Personal Details</h4>
                <div className="form-grid">
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">👤</span> Full Name
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

                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">📱</span> Contact
                    </label>
                    <input
                      type="text"
                      name="number"
                      className="form-input"
                      value={formData.number}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>

                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">🔒</span> Password
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

              {/* Membership Details */}
              <div className="form-section-group">
                <h4 className="section-title">Membership Details</h4>
                <div className="form-grid">
                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">📅</span> Plan
                    </label>
                    <select
                      name="plan"
                      className="form-select"
                      value={formData.plan}
                      onChange={handleChange}
                    >
                      <option value="full_time">Full Time</option>
                      <option value="part_time">Part Time</option>
                    </select>
                  </div>

                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">💰</span> Fees
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

                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">📆</span> Start Date
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

                  <div className="form-section">
                    <label className="form-label">
                      <span className="label-icon">📆</span> End Date
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
                  <span className="btn-icon">←</span> Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="btn-spinner"></span> Adding Member...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">✓</span> Add Member
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
