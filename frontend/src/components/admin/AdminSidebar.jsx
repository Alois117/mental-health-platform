import { FaHome, FaUsers, FaCalendar, FaChartLine, FaCog, FaBox, FaMoneyBill, FaFileAlt, FaUser } from "react-icons/fa";

const AdminSidebar = ({ setActivePage }) => {
    const menuItems = [
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
    ];

    return (
        <div className="h-full w-64 bg-gray-900 text-white p-5">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
            <nav>
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.page} className="mb-4">
                            <button onClick={() => setActivePage(item.page)} className="flex items-center gap-2 w-full text-left">
                                {item.icon} {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
