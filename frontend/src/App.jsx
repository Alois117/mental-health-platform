import React from 'react';
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import TherapistDashboard from "./pages/therapist/TherapistDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AppointmentList from "./components/AppointmentList";
import MoodTracker from "./components/MoodTracker";
import UserProfile from "./components/UserProfile";

const UserLayout = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActivePage={setActivePage} />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "appointments" && <AppointmentList />}
          {activePage === "moodTracker" && <MoodTracker />}
          {activePage === "profile" && <UserProfile />}
        </div>
      </div>
    </div>
  );
};


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<UserLayout />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/therapist/dashboard" element={<TherapistDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
