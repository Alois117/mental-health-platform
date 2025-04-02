import { FaHome, FaCalendar, FaSmile, FaUser, FaComments, FaVideo, FaClipboardList, FaChartLine, FaBook, FaCreditCard, FaCog, FaBox } from "react-icons/fa";

const UserSidebar = ({ setActivePage }) => {
    const menuItems = [
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
    ];

    return (
        <div className="h-full w-64 bg-gray-900 text-white p-5">
            <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
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

export default UserSidebar;