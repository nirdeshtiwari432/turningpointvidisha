import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
import Hero from "./components/Hero/Hero";
import AboutPage from "./components/About/AboutPage";
import SignupPage from "./components/Signup/SignupPage";
import LoginPage from "./components/Login/LoginPage";
import MembershipPage from "./components/Membership/MembershipPage";
import PaymentPage from "./components/Payments/PaymentPage.jsx";
import Profile from "./components/user/ProfilePage.jsx";

// Dashboard Components
import Seat from "./components/Dashboard/Seat";
import Alerts from "./components/Alert/Alert";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import MembersPage from "./components/Dashboard/MembersPage";
import SeatsPage from "./components/Dashboard/SeatsPage";
import EditMemberPage from "./components/Dashboard/edit.jsx";
import MemberDetailsPage from "./components/Dashboard/MemberDetailsPage.jsx";
import Unpaid from "./components/Dashboard/Unpaid/UnpaidPage.jsx";
import NewMember from "./components/Dashboard/newmember.jsx";
import Plan from "./components/Dashboard/plan/ManagePlans.jsx";
import Alert from "./components/Dashboard/Alert/ManageAlerts.jsx";
import Fees from "./components/Dashboard/Fees/Transactions.jsx"

// Auth
import ProtectedRoute from "./components/Dashboard/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/user/profile" element={<Profile />} />

        {/* Protected Routes */}
        <Route path="/seats" element={<ProtectedRoute><Seat /></ProtectedRoute>} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/members" element={<ProtectedRoute><MembersPage /></ProtectedRoute>} />
        <Route path="/seats" element={<ProtectedRoute><SeatsPage /></ProtectedRoute>} />
        <Route path="/members/:id" element={<ProtectedRoute><MemberDetailsPage /></ProtectedRoute>} />
        <Route path="/members/:id/edit" element={<ProtectedRoute><EditMemberPage /></ProtectedRoute>} />
        <Route path="/unpaid" element={<ProtectedRoute><Unpaid /></ProtectedRoute>} />
        <Route path="/admin/new/:seatId/:seatNo" element={<ProtectedRoute><NewMember /></ProtectedRoute>} />
        <Route path="/admin/alert" element={<ProtectedRoute><Alert /></ProtectedRoute>} />
        <Route path="/admin/transactions" element={<ProtectedRoute><Fees /></ProtectedRoute>} />
        <Route path="/plan" element={<Plan />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
