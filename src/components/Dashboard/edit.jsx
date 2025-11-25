import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import "./edit.css";

const EditMemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    membershipType: "",
    plan: "",
    shift: "",
    seatNo: "",
    fees: "",
    startDate: "",
    endDate: "",
  });

  // Fetch user data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          number: data.number || "",
          membershipType: data.membershipType || "",
          plan: data.plan || "",
          shift: data.shift || "",
          seatNo: data.seatNo || "",
          fees: data.fees || "",
          startDate: data.startDate ? data.startDate.split("T")[0] : "",
          endDate: data.endDate ? data.endDate.split("T")[0] : "",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) return <p className="text-center my-4 loading-text">Loading...</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Member updated successfully");
        navigate(`/members/${id}`);
      } else {
        alert("❌ Failed to update member");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating member ❌");
    }
  };

  return (
    <DashboardHeader>
      <div className="edit-page-container">
        <div className="edit-card">
          <h2>Edit Member</h2>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Number */}
            <div className="form-group">
              <label className="form-label">Number</label>
              <input
                type="text"
                className="form-control"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>

            {/* Membership Type */}
            <div className="form-group">
              <label className="form-label">Membership Type</label>
              <input
                type="text"
                className="form-control"
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
              />
            </div>

            {/* Plan */}
            <div className="form-group">
              <label className="form-label">Plan</label>
              <input
                type="text"
                className="form-control"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
              />
            </div>

            {/* Seat No */}
            <div className="form-group">
              <label className="form-label">Seat Number</label>
              <input
                type="text"
                className="form-control"
                name="seatNo"
                value={formData.seatNo}
                onChange={handleChange}
              />
            </div>

            {/* Shift */}
            <div className="form-group">
              <label className="form-label">Shift</label>
              <input
                type="text"
                className="form-control"
                name="shift"
                value={formData.shift}
                onChange={handleChange}
              />
            </div>

            {/* Fees */}
            <div className="form-group">
              <label className="form-label">Fees</label>
              <input
                type="number"
                className="form-control"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
              />
            </div>

            {/* Dates */}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Update Member
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(`/members/${id}`)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardHeader>
  );
};

export default EditMemberPage;