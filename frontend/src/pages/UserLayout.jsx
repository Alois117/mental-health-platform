import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import AppointmentList from "../components/AppointmentList";
import MoodTracker from "../components/user/MoodTracker";
import UserProfile from "../components/UserProfile";
import ChatBox from "../components/ChatBox";
import VideoCall from "../components/VideoCall";
import DailyCheckIn from "../components/user/DailyCheckIn";
import ProgressReports from "../components/ProgressReports";
import Resources from "../components/Resources";
import Subscription from "../components/Subscription";
import Settings from "../components/Settings";
import SystemSettings from "../components/admin/SystemSettings";
import Reports from "../components/admin/Reports";
import UserManagement from "../components/admin/UserManagement";
import PatientsList from "../components/therapist/PatientsList";
import TherapySessions from "../components/therapist/TherapySessions";

// Import Dummy Components for New Features
import UserPayments from "../components/user/Payments";
import UserPackages from "../components/user/Packages";
import TherapistPayments from "../components/therapist/Payments";
import TherapistServices from "../components/therapist/Services";
import AdminPayments from "../components/admin/Payments";
import AdminPackages from "../components/admin/Packages";
import AdminServices from "../components/admin/Services";

const UserLayout = ({ role }) => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    // Shared components
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "appointments":
        return <AppointmentList />;
      case "profile":
        return <UserProfile />;
      case "chat":
        return <ChatBox />;
      case "videoCall":
        return <VideoCall userRole={role}/>;
      case "settings":
        return <Settings />;
      default:
        break;
    }

    // Role-specific components
    if (role === "user") {
      switch (activePage) {
        case "moodTracker":
          return <MoodTracker />;
        case "dailyCheckIn":
          return <DailyCheckIn />;
        case "progress":
          return <ProgressReports />;
        case "resources":
          return <Resources />;
        case "subscription":
          return <Subscription />;
        case "payments":
          return <UserPayments />;
        case "packages":
          return <UserPackages />;
        default:
          return <Dashboard />;
      }
    }

    if (role === "therapist") {
      switch (activePage) {
        case "patientsList":
          return <PatientsList />;
        case "therapySessions":
          return <TherapySessions />;
        case "payments":
          return <TherapistPayments />;
        case "services":
          return <TherapistServices />;
        default:
          return <Dashboard />;
      }
    }

    if (role === "admin") {
      switch (activePage) {
        case "manageUsers":
          return <UserManagement />;
        case "reports":
          return <Reports />;
        case "systemSettings":
          return <SystemSettings />;
        case "payments":
          return <AdminPayments />;
        case "packages":
          return <AdminPackages />;
        case "services":
          return <AdminServices />;
        default:
          return <Dashboard />;
      }
    }

    return <Dashboard />;
  };

  return (
    <div className="flex h-screen">
        <div className="h-full w-64 bg-gray-900"> 
            <Sidebar setActivePage={setActivePage} role={role} />
        </div>
        <div className="flex-1 flex flex-col"> 
            <Navbar />
            <div className="flex-1 p-5 overflow-auto"> 
                {renderPage()}
            </div>
        </div>
    </div>
);
};

export default UserLayout;