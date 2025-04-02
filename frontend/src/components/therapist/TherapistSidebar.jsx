import { FaHome, FaCalendar, FaComments, FaVideo, FaUsers, FaClipboardList, FaUser, FaMoneyBill, FaFileAlt, FaCog } from "react-icons/fa";

const TherapistSidebar = ({ setActivePage }) => {
    const menuItems = [
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
    ];

    return (
        <div className="h-full w-64 bg-gray-900 text-white p-5">
            <h2 className="text-2xl font-bold mb-6">Therapist Dashboard</h2>
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

export default TherapistSidebar;