import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import   "./Otpp.css";


const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // ✅ Get number from query params (sent from login)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const num = params.get("number");
    if (num) setNumber(num);
  }, [location]);

  // ✅ Handle OTP Verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // maintain session
          body: JSON.stringify({ number, otp }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("✅ OTP Verified Successfully!");
        localStorage.setItem("user", JSON.stringify({ ...data.user, role: "user" }));

        // redirect to user profile after short delay
        setTimeout(() => {
          window.location.href = "/user/profile";
        }, 1000);
      } else {
        setMessage(`❌ ${data.message || "Invalid OTP"}`);
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      setMessage("❌ Server Error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Resend OTP
  const resendOtp = async () => {
    if (!number) return;
    setResendLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/resend-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ number }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ OTP sent again to WhatsApp");
      } else {
        setMessage(`❌ ${data.message || "Failed to resend OTP"}`);
      }
    } catch (err) {
      console.error("Resend OTP Error:", err);
      setMessage("❌ Could not resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-container">
        <h2>Verify OTP</h2>
        <p className="subtitle">Enter the code sent to your WhatsApp</p>

        {message && (
          <div
            className={`alert ${
              message.startsWith("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>OTP *</label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit OTP"
              required
            />
          </div>

          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          className="btn secondary resend-btn"
          onClick={resendOtp}
          disabled={resendLoading}
        >
          {resendLoading ? "Sending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
