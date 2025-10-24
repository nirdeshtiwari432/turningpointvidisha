import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import MembersTable from "./MembersTable";
import UserDetailsCard from "./UserDetailsCard";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/members`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <DashboardHeader>
      <div className="members-page-container">
        {/* Page Header */}
        <div className="page-header-section">
          <h1 className="page-title">Member Details</h1>
          <p className="page-subtitle">Manage all library members</p>
        </div>

        {/* Members Table */}
        <div className="content-section">
          <MembersTable members={members} setUser={setSelectedUser} />
        </div>

        {/* User Details Card - Shows when a user is selected */}
        {selectedUser && (
          <div className="content-section">
            <UserDetailsCard user={selectedUser} />
          </div>
        )}
      </div>
    </DashboardHeader>
  );
};

export default MembersPage;