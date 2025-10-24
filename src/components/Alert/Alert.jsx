import React, { useState, useEffect } from "react";
import "./Alert.css";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch alerts from backend
  const fetchAlerts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/alerts`, {
        credentials: "include", // if your backend uses cookies/session
      });
      const data = await res.json();
      if (data.success) {
        setAlerts(data.alerts);
      }
    } catch (err) {
      console.error("Error fetching alerts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="alerts-page">
      <h2>Member Alerts</h2>
      <div className="alerts-container">
        {loading ? (
          <p>Loading alerts...</p>
        ) : alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert._id} className="alert-card">
              <p>
                🚨 <strong>{alert.title}</strong>: {alert.description}
              </p>
            </div>
          ))
        ) : (
          <p className="no-alerts">No alerts available.</p>
        )}
      </div>
    </div>
  );
};

export default Alerts;
