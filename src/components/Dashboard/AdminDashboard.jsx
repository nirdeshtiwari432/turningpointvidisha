import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import BankDetailsTable from "./Fees/BankDetailsTable";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [monthlyData, setMonthlyData] = useState({ totalAmount: 0, users: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyCollection = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/monthly-collection`, {
          credentials: "include",
        });
        const result = await res.json();
        setMonthlyData(result);
      } catch (error) {
        console.error("Error fetching monthly collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyCollection();
  }, []);

  return (
    <DashboardHeader>
      <div className="admin-dashboard-container">
        {/* Main Dashboard Header */}
        <div className="dashboard-header-section">
          <h1 className="dashboard-main-title">Turning Point</h1>
          <p className="dashboard-subtitle">Library Management Dashboard</p>
        </div>

        {/* Monthly Collection Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Monthly Collection</h3>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="loading-state">Loading data...</div>
            ) : (
              <div className="monthly-collection-content">
                <div className="total-amount-section">
                  <span className="amount-label">Total Amount</span>
                  <div className="amount-value">₹{monthlyData.totalAmount || 0}</div>
                </div>
                
                {monthlyData.users.length > 0 ? (
                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Membership Type</th>
                          <th>Plan</th>
                          <th>Fees</th>
                          <th>End Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyData.users.map((user) => (
                          <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.membershipType}</td>
                            <td>{user.plan}</td>
                            <td className="fees-amount">₹{user.fees}</td>
                            <td>{new Date(user.endDate).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="no-data">
                    <p>No paid members this month.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>



      </div>
    </DashboardHeader>
  );
};

export default AdminDashboard;