import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [greeting, setGreeting] = useState("");
    const navigate = useNavigate();

    // Function to update user state from localStorage
    const updateUser = () => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        const storedName = localStorage.getItem("name");

        if (storedToken && storedRole && storedName) {
            setUser({ name: storedName, role: storedRole });
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        // Set greeting message based on time
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");

        // Initial check for user
        updateUser();

        // Listen for custom event to update user state
        window.addEventListener("userLoggedIn", updateUser);

        // Cleanup event listener
        return () => {
            window.removeEventListener("userLoggedIn", updateUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg">
            {/* Left - Greeting and Username */}
            <div className="text-lg font-semibold">
                {greeting}, {user?.name || "User"}
            </div>

            {/* Right - Logout Button */}
            <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;