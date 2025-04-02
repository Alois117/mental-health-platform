import React, { useState } from "react";
import Sidebar from "../therapist/TherapistSidebar";
import Navbar from "../therapist/TherapistNavbar";
import Dashboard from "../Dashboard";
import PatientsList from "../therapist/PatientsList";
import TherapySessions from "../therapist/TherapySessions";
import TherapistPayments from "../therapist/Payments";
import TherapistServices from "../therapist/Services";

const TherapistLayout = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "patientsList": return <PatientsList />;
      case "therapySessions": return <TherapySessions />;
      case "payments": return <TherapistPayments />;
      case "services": return <TherapistServices />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActivePage={setActivePage} role="therapist" />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-5 overflow-auto">{renderPage()}</div>
      </div>
    </div>
  );
};

export default TherapistLayout;