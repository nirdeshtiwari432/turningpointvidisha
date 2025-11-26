import React, { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import "./managePlans.css";

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "seat", // seat | longterm
    timing: "",
    duration: "",
    reserved: false,
  });

  // Fetch plans
  useEffect(() => {
    fetch("/api/plans")
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/plans/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (data.success) {
      setPlans([...plans, data.plan]);
      setForm({
        title: "",
        price: "",
        category: "seat",
        timing: "",
        duration: "",
        reserved: false,
      });
    } else {
      alert("Error adding plan");
    }
  };

  // Delete plan
  const deletePlan = async (id) => {
    const response = await fetch(`/api/plans/${id}`, { method: "DELETE" });
    const data = await response.json();

    if (data.success) {
      setPlans(plans.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="manage-plans-container">
      <DashboardHeader title="Manage Plans" />

      {/* Add New Plan Form */}
      <div className="form-section">
        <h3>Add New Plan</h3>
        <form onSubmit={handleSubmit} className="plan-form">

          <label>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <label>Price</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <label>Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="seat">Seat Plan</option>
            <option value="longterm">Long Term Plan</option>
          </select>

          {/* Timing only for Seat Plan */}
          {form.category === "seat" && (
            <>
              <label>Timing</label>
              <input
                type="text"
                placeholder="10AM - 5PM"
                value={form.timing}
                onChange={(e) => setForm({ ...form, timing: e.target.value })}
                required
              />
            </>
          )}

          {/* Duration only for Long-Term Plan */}
          {form.category === "longterm" && (
            <>
              <label>Duration (Days)</label>
              <input
                type="number"
                placeholder="30"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                required
              />
            </>
          )}

          {/* Reserved Checkbox (Common for both) */}
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={form.reserved}
                onChange={(e) =>
                  setForm({ ...form, reserved: e.target.checked })
                }
              />
              Reserved Seat
            </label>
          </div>

          <button type="submit" className="submit-btn">Add Plan</button>
        </form>
      </div>

      {/* Plans Table */}
      <div className="table-section">
        <h3>All Plans</h3>
        <table className="plans-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Timing</th>
              <th>Duration</th>
              <th>Reserved</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {plans.map((plan) => (
              <tr key={plan._id}>
                <td>{plan.title}</td>
                <td>₹{plan.price}</td>
                <td>{plan.category}</td>
                <td>{plan.timing || "-"}</td>
                <td>{plan.duration || "-"}</td>

                {/* Reserved Status */}
                <td>
                  <span
                    className={`reserved-status ${
                      plan.reserved ? "yes" : "no"
                    }`}
                  >
                    {plan.reserved ? "Reserved" : "Non-Reserved"}
                  </span>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deletePlan(plan._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ManagePlans;
