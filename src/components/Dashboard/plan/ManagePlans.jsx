import React, { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import "./managePlans.css";

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "seat",
    timing: "",
    duration: "",
    reserved: false,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all plans
  const fetchPlans = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/plans`);
      const data = await res.json();
      if (data.success) setPlans(data.plans);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${import.meta.env.VITE_API_URL}/admin/plans/${editId}`
      : `${import.meta.env.VITE_API_URL}/admin/plans/addPlan`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        alert(editId ? "Plan updated successfully!" : "Plan added successfully!");
        setForm({
          title: "",
          price: "",
          category: "seat",
          timing: "",
          duration: "",
          reserved: false,
        });
        setEditId(null);
        fetchPlans();
      } else {
        alert("Failed to save plan.");
      }
    } catch (err) {
      console.error("Error saving plan:", err);
      alert("Error saving plan.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/plans/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        alert("Plan deleted successfully!");
        fetchPlans();
      } else {
        alert("Failed to delete plan.");
      }
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  // Handle edit
  const handleEdit = (plan) => {
    setForm({
      title: plan.title,
      price: plan.price,
      category: plan.category,
      timing: plan.timing || "",
      duration: plan.duration || "",
      reserved: plan.reserved || false,
    });
    setEditId(plan._id);
  };

  // Reset form on category change
  useEffect(() => {
    if (form.category === "seat") {
      setForm((f) => ({ ...f, duration: "" }));
    } else {
      setForm((f) => ({ ...f, timing: "", reserved: false }));
    }
  }, [form.category]);

  return (
    <DashboardHeader>
      <div className="plans-page-content">
        <div className="page-header-section">
          <div>
            <h1 className="page-title">Manage Membership Plans</h1>
            <p className="page-subtitle">Create and manage different membership plans for your gym</p>
          </div>
        </div>

        <div className="content-section">
          <div className="plans-container">
            {/* Form Section */}
            <div className="form-card">
              <h3>{editId ? "Edit Plan" : "Add New Plan"}</h3>
              <form className="plan-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Plan Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Morning Shift, Annual Membership"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      placeholder="Enter price"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="seat">Seat Plan</option>
                      <option value="longterm">Long Term Plan</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      {form.category === "seat" ? "Timing" : "Duration"}
                    </label>
                    {form.category === "seat" ? (
                      <input
                        type="text"
                        placeholder="e.g., 6:00 AM - 12:00 PM"
                        value={form.timing}
                        onChange={(e) => setForm({ ...form, timing: e.target.value })}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="e.g., 6 months, 1 year"
                        value={form.duration}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      />
                    )}
                  </div>
                </div>

                {form.category === "seat" && (
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={form.reserved}
                        onChange={(e) => setForm({ ...form, reserved: e.target.checked })}
                      />
                      <span className="checkmark"></span>
                      Reserved Seat
                    </label>
                  </div>
                )}

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : (editId ? "Update Plan" : "Add Plan")}
                  </button>

                  {editId && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setForm({
                          title: "",
                          price: "",
                          category: "seat",
                          timing: "",
                          duration: "",
                          reserved: false,
                        });
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
                  <h3 className="card-title">Current Plans</h3>
                  <p className="card-subtitle">Total {plans.length} plan{plans.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              <div className="card-body">
                <div className="table-container">
                  <table className="plans-table">
                    <thead>
                      <tr>
                        <th>Plan Title</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Timing/Duration</th>
                        <th>Reserved</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((plan) => (
                        <tr key={plan._id}>
                          <td className="plan-title">{plan.title}</td>
                          <td className="plan-price">₹{plan.price}</td>
                          <td>
                            <span className={`category-badge ${plan.category}`}>
                              {plan.category === "seat" ? "Seat Plan" : "Long Term"}
                            </span>
                          </td>
                          <td>
                            {plan.category === "seat" ? plan.timing : plan.duration}
                          </td>
                          <td>
                            <span className={`reserved-status ${plan.reserved ? 'yes' : 'no'}`}>
                              {plan.reserved ? "Yes" : "No"}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="btn-edit"
                                onClick={() => handleEdit(plan)}
                              >
                                Edit
                              </button>
                              <button 
                                className="btn-delete"
                                onClick={() => handleDelete(plan._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {plans.length === 0 && (
                        <tr>
                          <td colSpan="6" className="no-data">
                            <div className="no-plans-message">
                              <p>No plans found</p>
                              <span>Add your first plan using the form above</span>
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

export default ManagePlans;