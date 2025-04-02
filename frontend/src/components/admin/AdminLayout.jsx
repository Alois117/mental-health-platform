import React, { useState } from "react";
import Sidebar from "../admin/AdminSidebar";
import Navbar from "../admin/AdminNavbar";
import Dashboard from "../Dashboard";
import UserManagement from "../admin/UserManagement";
import Reports from "../admin/Reports";
import SystemSettings from "../admin/SystemSettings";
import AdminPayments from "../admin/Payments";
import AdminPackages from "../admin/Packages";
import AdminServices from "../admin/Services";

const AdminLayout = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "manageUsers": return <UserManagement />;
      case "reports": return <Reports />;
      case "systemSettings": return <SystemSettings />;
      case "payments": return <AdminPayments />;
      case "packages": return <AdminPackages />;
      case "services": return <AdminServices />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActivePage={setActivePage} role="admin" />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-5 overflow-auto">{renderPage()}</div>
      </div>
    </div>
  );
};

export default AdminLayout;