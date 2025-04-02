import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
    const [admin, setAdmin] = useState(null);
    const [greeting, setGreeting] = useState("");
    const navigate = useNavigate();

    const updateAdmin = () => {
        const storedToken = localStorage.getItem("token");
        const storedName = localStorage.getItem("name");

        if (storedToken && storedName) {
            setAdmin({ name: storedName });
        } else {
            setAdmin(null);
        }
    };

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");

        updateAdmin();
        window.addEventListener("userLoggedIn", updateAdmin);

        return () => {
            window.removeEventListener("userLoggedIn", updateAdmin);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setAdmin(null);
        navigate("/login");
    };

    return (
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg">
            <div className="text-lg font-semibold">
                {greeting}, {admin?.name || "Admin"}
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default AdminNavbar;