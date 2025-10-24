import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MembersTable.css";

const MembersTable = ({ members }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter members by name (case-insensitive)
  const filteredMembers = members.filter((member) =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="members-table-container">
      <div className="table-header d-flex justify-content-between align-items-center">
        <h2>Our Members</h2>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredMembers.length === 0 ? (
        <div className="no-members-message">
          <p>No members found.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="members-table table table-striped">
            <thead>
              <tr>
                <th width="60">S.No.</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>CONTACT</th>
                <th>MEMBERSHIP</th>
                <th>PLAN</th>
                <th width="120">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr key={member._id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="fw-semibold">{member.name || "—"}</td>
                  <td>{member.email || "—"}</td>
                  <td>{member.number || "—"}</td>
                  <td>
                    <span
                      className={`badge ${
                        member.membershipType === "reserved"
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    >
                      {member.membershipType || "—"}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {member.plan || "—"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/members/${member._id}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MembersTable;
