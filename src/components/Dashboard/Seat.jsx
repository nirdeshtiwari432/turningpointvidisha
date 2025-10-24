import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Seat.css";
import DashboardHeader from "./DashboardHeader";

const Seat = () => {
  const [seats, setSeats] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch seats from API
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/admin/seats?filter=${filter}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setSeats(data.seats || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching seats:", err);
        setLoading(false);
      });
  }, [filter]);

  // 👇 Handle Book button click
  const handleBook = (seatId, seatNo) => {
    navigate(`/admin/new/${seatId}/${seatNo}`);
  };

  return (
    <DashboardHeader>
      <div className="seat-page-content">
        <div className="page-header-section">
          <div>
            <h1 className="page-title">Seat Details</h1>
            <p className="page-subtitle">Manage seat bookings</p>
          </div>
        </div>

        <div className="content-section">
          <div className="table-card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="card-title">Seat Booking Status</h3>
                  <p className="card-subtitle">
                    Total {seats.length} seat{seats.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <select
                  className="filter-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="booked">Booked</option>
                  <option value="notBooked">Not Booked</option>
                  <option value="registered">Registered</option>
                  <option value="notRegistered">Not Registered</option>
                </select>
              </div>
            </div>

            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <p>Loading seat data...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="seats-table">
                    <thead>
                      <tr>
                        <th>SEAT NO</th>
                        <th>IS BOOKED</th>
                        <th>BOOKED BY</th>
                        <th>SHIFT</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seats.length > 0 ? (
                        seats.map((seat) => {
                          const bookedUsers = seat.bookedBy || [];
                          const isBooked = bookedUsers.length > 0;

                          return (
                            <tr key={seat._id}>
                              <td className="text-center fw-bold">{seat.seatNo}</td>
                              <td>{isBooked ? "Yes" : "No"}</td>
                              <td>
                                {bookedUsers.length > 0
                                  ? bookedUsers.map((b, idx) => (
                                      <div key={idx}>{b.user?.name || "Unknown"}</div>
                                    ))
                                  : "-"}
                              </td>
                              <td>
                                {bookedUsers.length > 0
                                  ? bookedUsers.map((b, idx) => (
                                      <div key={idx}>{b.shift?.replace("_", " ") || "-"}</div>
                                    ))
                                  : "-"}
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleBook(seat._id, seat.seatNo)}
                                  disabled={isBooked}
                                >
                                  {isBooked ? "Booked" : "Book"}
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            No records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardHeader>
  );
};

export default Seat;
