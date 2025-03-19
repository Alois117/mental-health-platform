import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserLayout from "./pages/UserLayout";


function App() {
  return (
    <Routes> 
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<UserLayout role="user" />} />
      <Route path="/therapist/dashboard" element={<UserLayout role="therapist" />} />
      <Route path="/admin/dashboard" element={<UserLayout role="admin" />} />
    </Routes>
  );
}

export default App;