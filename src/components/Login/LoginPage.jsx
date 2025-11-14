import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

// ✨ Simple sanitization helper
const sanitizeInput = (value) => {
  if (typeof value !== "string") return "";
  let sanitized = value.replace(/\$/g, "");
  sanitized = sanitized.replace(/[{}<>;]/g, "");
  return sanitized.trim();
};

const LoginPage = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const safeNumber = sanitizeInput(number);
    const safePassword = sanitizeInput(password);

    const route = role === "admin" ? "admin/login" : "user/login";
    const body =
      role === "admin"
        ? { mobile: safeNumber, password: safePassword }
        : { number: safeNumber, password: safePassword };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${route}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();

      // ✅ If backend wants us to redirect (not verified)
      if (!data.success && data.redirect) {
        navigate(data.redirect);
        return;
      }

      // ✅ Success login
      if (data.success) {
        alert(data.message);
        localStorage.setItem("user", JSON.stringify({ ...data.user, role }));
        window.location.href =
          role === "admin" ? "/dashboard" : "/user/profile";
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your journey.</p>

        {/* Role Selection */}
        <div className="form-group">
          <label>Login As:</label>
          <div>
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={(e) => setRole(e.target.value)}
            />{" "}
            User
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginLeft: "20px" }}
            />{" "}
            Admin
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Number</label>
            <input
              type="number"
              placeholder="Enter your number"
              value={number}
              onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="register-link">
            <p>Don't have an account?</p>
            <button
              type="button"
              className="btn secondary"
              onClick={() => navigate("/signup")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
