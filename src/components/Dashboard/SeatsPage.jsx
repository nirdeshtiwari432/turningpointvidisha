import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import SeatsTable from "./SeatsTable";

const SeatsPage = () => {
  const [seats, setSeats] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/seats?filter=${filter}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setSeats(data.seats || []))
      .catch(err => console.error(err));
  }, [filter]);

  return (
    <DashboardHeader>
      <div className="seats-page-content">
        <div className="page-header-section">
          <div>
            <h1 className="page-title">Seat Details</h1>
            <p className="page-subtitle">Manage seat bookings and availability</p>
          </div>
        </div>
        
        <div className="content-section">
          <SeatsTable seats={seats} filter={filter} setFilter={setFilter} />
        </div>
      </div>
    </DashboardHeader>
  );
};

export default SeatsPage;