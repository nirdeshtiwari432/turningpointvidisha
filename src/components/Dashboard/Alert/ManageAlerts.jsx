import React, { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import "./manageAlerts.css";

const ManageAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all alerts
  const fetchAlerts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/alerts`);
      const data = await res.json();
      if (data.success) setAlerts(data.alerts);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${import.meta.env.VITE_API_URL}/admin/alerts/${editId}`
      : `${import.meta.env.VITE_API_URL}/admin/alerts/addAlert`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        alert(editId ? "Alert updated successfully!" : "Alert added successfully!");
        setForm({ title: "", description: "" });
        setEditId(null);
        fetchAlerts();
      } else {
        alert("Failed to save alert.");
      }
    } catch (err) {
      console.error("Error saving alert:", err);
      alert("Error saving alert.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this alert?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/alerts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        alert("Alert deleted successfully!");
        fetchAlerts();
      } else {
        alert("Failed to delete alert.");
      }
    } catch (err) {
      console.error("Error deleting alert:", err);
    }
  };

  // Handle edit
  const handleEdit = (alert) => {
    setForm({ title: alert.title, description: alert.description });
    setEditId(alert._id);
  };

  return (
    <DashboardHeader>
      <div className="alerts-page-content">
        <div className="page-header-section">
          <div>
            <h1 className="page-title">Manage Alerts & Announcements</h1>
            <p className="page-subtitle">
              Create, update, and delete important announcements for users
            </p>
          </div>
        </div>

        <div className="content-section">
          <div className="alerts-container">
            {/* Form Section */}
            <div className="form-card">
              <h3>{editId ? "Edit Alert" : "Add New Alert"}</h3>
              <form className="alert-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Enter alert title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Enter detailed alert message"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : editId ? "Update Alert" : "Add Alert"}
                  </button>

                  {editId && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setForm({ title: "", description: "" });
                        setEditId(null);
                      }}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Table Section */}
            <div className="table-card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Current Alerts</h3>
                  <p className="card-subtitle">
                    Total {alerts.length} alert{alerts.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="card-body">
                <div className="table-container">
                  <table className="alerts-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alerts.map((alert) => (
                        <tr key={alert._id}>
                          <td className="alert-title">{alert.title}</td>
                          <td className="alert-description">{alert.description}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-edit"
                                onClick={() => handleEdit(alert)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn-delete"
                                onClick={() => handleDelete(alert._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {alerts.length === 0 && (
                        <tr>
                          <td colSpan="3" className="no-data">
                            <div className="no-alerts-message">
                              <p>No alerts found</p>
                              <span>Add a new alert using the form above</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardHeader>
  );
};

export default ManageAlerts;
