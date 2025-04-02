import React from "react";
import UserLayout from "../components/user/UserLayout";
import TherapistLayout from "../components/therapist/TherapistLayout";
import AdminLayout from "../components/admin/AdminLayout";

const MainLayout = ({ role }) => {
  if (role === "therapist") return <TherapistLayout />;
  if (role === "admin") return <AdminLayout />;
  return <UserLayout />;
};

export default MainLayout;