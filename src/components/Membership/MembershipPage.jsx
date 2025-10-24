import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./membership.css";

const MembershipPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seatPlans, setSeatPlans] = useState([]);
  const [longTermPlans, setLongTermPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/check-login`, {
          credentials: "include",
        });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPlans = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/plans`);
        const data = await res.json();
        if (data.success) {
          setSeatPlans(data.plans.filter(p => p.category === "seat"));
          setLongTermPlans(data.plans.filter(p => p.category === "longterm"));
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    };

    checkLogin();
    fetchPlans();
  }, []);

  const handlePaymentClick = (plan) => {
    if (!isLoggedIn) return navigate("/login");
    navigate("/payment", { state: { plan } });
  };

  return (
    <section className="membership">
      <div className="container">
        <h2 className="membership-title">Choose Your Membership</h2>

        <h3 className="category-title">Seat Plans</h3>
        <div className="membership-cards">
          {seatPlans.map((plan, idx) => (
            <div className={`card ${plan.reserved ? "popular" : ""}`} key={idx}>
              {plan.reserved && <div className="badge">RESERVED</div>}
              <h3>{plan.title}</h3>
              <p className="price">₹{plan.price} <span>/month</span></p>
              <ul>
                <li>{plan.reserved ? "Reserved seat" : "Unreserved seat"}</li>
                <li>Timing: {plan.timing}</li>
              </ul>
              <button className="btn" onClick={() => handlePaymentClick(plan)}>
                Pay Now
              </button>
            </div>
          ))}
        </div>

        <h3 className="category-title">Long-Term Plans</h3>
        <div className="membership-cards">
          {longTermPlans.map((plan, idx) => (
            <div className="card" key={idx}>
              <h3>{plan.title}</h3>
              <p className="price">
                ₹{plan.price}{plan.title === "1 Year Plan" && <span>/year</span>}
              </p>
              <ul>
                <li>Flexible seat access</li>
                <li>Valid for {plan.duration}</li>
              </ul>
              <button className="btn" onClick={() => handlePaymentClick(plan)}>
                Pay Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipPage;
