import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
    const [user, setUser] = useState(null);
    const [greeting, setGreeting] = useState("");
    const navigate = useNavigate();

    const updateUser = () => {
        const storedToken = localStorage.getItem("token");
        const storedName = localStorage.getItem("name");

        if (storedToken && storedName) {
            setUser({ name: storedName });
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");

        updateUser();
        window.addEventListener("userLoggedIn", updateUser);

        return () => {
            window.removeEventListener("userLoggedIn", updateUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="bg-blue-900 text-white p-4 flex items-center justify-between shadow-lg">
            <div className="text-lg font-semibold">
                {greeting}, {user?.name || "User"}
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

export default UserNavbar;