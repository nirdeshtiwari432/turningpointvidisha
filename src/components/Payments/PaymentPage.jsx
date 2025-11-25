import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import "./payment.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    upiMobile: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!location.state || !location.state.plan) {
    navigate("/membership");
    return null;
  }

  const { plan } = location.state;
  const upiId = "nirdeshtiwari432-1@okhdfcbank";
  const upiLink = `upi://pay?pa=${upiId}&pn=Library&am=${plan.price}&cu=INR&tn=${encodeURIComponent(plan.title)} Payment`;

  const handleChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/bank-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...bankDetails, plan: plan.title, amount: plan.price }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Bank details submitted for verification!");
        setSubmitted(true);
      } else {
        alert(data.message || "Failed to submit details");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting details");
    }
  };

  return (
<div className="payment-container">
      <h2>Payment for {plan.title}</h2>
      <p>Amount: ₹{plan.price}</p>
      {plan.timing && <p>Timing: {plan.timing}</p>}
      {plan.duration && <p>Duration: {plan.duration}</p>}

      <div style={{ margin: "20px auto", width: "220px" }}>
        <QRCode value={upiLink} size={200} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => (window.location.href = upiLink)}
          style={{ padding: "10px 20px", marginRight: "10px" }}
        >
          Pay via UPI
        </button>
        <button onClick={() => navigate("/membership")} style={{ padding: "10px 20px" }}>
          Back
        </button>
      </div>

      {!submitted && (
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: "40px", maxWidth: "400px", margin: "40px auto" }}
        >
          <h3>Enter Bank Details for Admin Verification</h3>
          <input
            type="text"
            name="accountHolder"
            placeholder="Account Holder Name"
            value={bankDetails.accountHolder}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <input
            type="text"
            name="upiMobile"
            placeholder="UPI Mobile Number"
            value={bankDetails.upiMobile}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>
            Submit Bank Details
          </button>
        </form>
      )}

      {submitted && (
        <p style={{ color: "green", marginTop: "20px" }}>
          Bank details submitted, awaiting admin verification.
        </p>
      )}
    </div>
  );
};

export default PaymentPage;
