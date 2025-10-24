import React, { useEffect, useState } from "react";
import "./BankDetailsTable.css";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../DashboardHeader";

const BankDetailsTable = () => {
  const navigate = useNavigate();
  const [bankDetails, setBankDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/fees`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        // ✅ Sort by newest submission first (descending order)
        const sortedData = data.sort(
          (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
        );

        setBankDetails(sortedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bank details");
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, []);

  const handleVerify = async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/varify/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to verify");

      setBankDetails((prev) =>
        prev.map((detail) =>
          detail._id === id ? { ...detail, verified: true } : detail
        )
      );
      alert("Verification successful ✅");
    } catch (err) {
      alert("Verification failed ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete record");

      setBankDetails((prev) => prev.filter((detail) => detail._id !== id));
      alert("Bank detail deleted successfully 🗑️");
    } catch (err) {
      alert("Failed to delete ❌");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Filter data based on search input
  const filteredDetails = bankDetails.filter((detail) =>
    detail.accountHolder?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardHeader>
      <div className="bank-details-container">
        <div className="table-header d-flex justify-content-between align-items-center mb-3">
          <h2>Bank Details</h2>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by account holder name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredDetails.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <table className="bank-details-table">
            <thead>
              <tr>
                <th>Account Holder</th>
                <th>UPI Mobile</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Verified</th>
                <th>Submitted At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDetails.map((detail) => (
                <tr key={detail._id || Math.random()}>
                  <td>{detail.accountHolder || "-"}</td>
                  <td>{detail.upiMobile || "-"}</td>
                  <td>{detail.plan || "-"}</td>
                  <td>{detail.amount || "-"}</td>
                  <td>{detail.verified ? "Yes" : "No"}</td>
                  <td>
                    {detail.submittedAt
                      ? new Date(detail.submittedAt).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/members/${detail.user}`)}
                      >
                        View
                      </button>

                      {!detail.verified && detail._id && (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleVerify(detail._id)}
                        >
                          Verify
                        </button>
                      )}

                      {detail._id && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(detail._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardHeader>
  );
};

export default BankDetailsTable;
