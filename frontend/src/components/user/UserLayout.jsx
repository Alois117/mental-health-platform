import React, { useState } from "react";
import Sidebar from "../user/UserSidebar";
import Navbar from "../user/UserNavbar";
import Dashboard from "../Dashboard";
import AppointmentList from "../AppointmentList";
import MoodTracker from "../user/MoodTracker";
import UserProfile from "../UserProfile";
import ChatBox from "../ChatBox";
import VideoCall from "../VideoCall";
import DailyCheckIn from "../user/DailyCheckIn";
import ProgressReports from "../ProgressReports";
import Resources from "../Resources";
import Subscription from "../Subscription";
import UserPayments from "../user/Payments";
import UserPackages from "../user/Packages";

const UserLayout = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "appointments": return <AppointmentList />;
      case "profile": return <UserProfile />;
      case "chat": return <ChatBox />;
      case "videoCall": return <VideoCall userRole="user" />;
      case "moodTracker": return <MoodTracker />;
      case "dailyCheckIn": return <DailyCheckIn />;
      case "progress": return <ProgressReports />;
      case "resources": return <Resources />;
      case "subscription": return <Subscription />;
      case "payments": return <UserPayments />;
      case "packages": return <UserPackages />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActivePage={setActivePage} role="user" />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-5 overflow-auto">{renderPage()}</div>
      </div>
    </div>
  );
};

export default UserLayout;