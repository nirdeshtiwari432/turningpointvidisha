import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import UserDetailsCard from "./UserDetailsCard";
import "./MemberDetail.css"
const MemberDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <DashboardHeader>
      {/* Remove the container-fluid and row divs - let DashboardHeader handle layout */}
      {!user ? (
        <div className="text-center my-4">
          <p>Loading...</p>
        </div>
      ) : (
        <UserDetailsCard user={user} />
      )}
    </DashboardHeader>
  );
};

export default MemberDetailsPage;
