import {
  FaHome, FaCalendar, FaSmile, FaUser, FaComments,
  FaVideo, FaClipboardList, FaChartLine, FaBook,
  FaCreditCard, FaCog, FaUsers, FaMoneyBill, FaBox, FaFileAlt
} from "react-icons/fa";

const Sidebar = ({ setActivePage, role }) => {
  // Define menu items for each role
  const menuItems = {
    user: [
      { name: "Home", page: "dashboard", icon: <FaHome /> },
      { name: "Appointments", page: "appointments", icon: <FaCalendar /> },
      { name: "Mood Tracker", page: "moodTracker", icon: <FaSmile /> },
      { name: "Profile", page: "profile", icon: <FaUser /> },
      { name: "Chat", page: "chat", icon: <FaComments /> },
      { name: "Video Call", page: "videoCall", icon: <FaVideo /> },
      { name: "Daily Check-In", page: "dailyCheckIn", icon: <FaClipboardList /> },
      { name: "Progress & Reports", page: "progress", icon: <FaChartLine /> },
      { name: "Resources", page: "resources", icon: <FaBook /> },
      { name: "Subscription & Payment", page: "subscription", icon: <FaCreditCard /> },
      { name: "Packages & Pricing", page: "packages", icon: <FaBox /> },
      { name: "Settings", page: "settings", icon: <FaCog /> },
    ],
    therapist: [
      { name: "Home", page: "dashboard", icon: <FaHome /> },
      { name: "Appointments", page: "appointments", icon: <FaCalendar /> },
      { name: "Chat", page: "chat", icon: <FaComments /> },
      { name: "Video Call", page: "videoCall", icon: <FaVideo /> },
      { name: "Patients List", page: "patientsList", icon: <FaUsers /> },
      { name: "Therapy Sessions", page: "therapySessions", icon: <FaClipboardList /> },
      { name: "Profile", page: "profile", icon: <FaUser /> },
      { name: "Payments", page: "payments", icon: <FaMoneyBill /> },
      { name: "Services", page: "services", icon: <FaFileAlt /> },
      { name: "Settings", page: "settings", icon: <FaCog /> },
    ],
    admin: [
      { name: "Home", page: "dashboard", icon: <FaHome /> },
      { name: "Manage Users", page: "manageUsers", icon: <FaUsers /> },
      { name: "Appointments", page: "appointments", icon: <FaCalendar /> },
      { name: "Reports", page: "reports", icon: <FaChartLine /> },
      { name: "System Settings", page: "systemSettings", icon: <FaCog /> },
      { name: "Packages & Pricing", page: "packages", icon: <FaBox /> },
      { name: "Payments", page: "payments", icon: <FaMoneyBill /> },
      { name: "Services", page: "services", icon: <FaFileAlt /> },
      { name: "Profile", page: "profile", icon: <FaUser /> },
      { name: "Settings", page: "settings", icon: <FaCog /> },
    ],
  };

    return (
        <div className="h-full w-64 bg-gray-900 text-white p-5"> 
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <nav>
                <ul>
                    {menuItems[role].map((item) => (
                        <li key={item.page} className="mb-4">
                            <button
                                onClick={() => setActivePage(item.page)}
                                className="flex items-center gap-2 w-full text-left"
                            >
                                {item.icon} {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;