import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TherapistNavbar = () => {
    const [therapist, setTherapist] = useState(null);
    const [greeting, setGreeting] = useState("");
    const navigate = useNavigate();

    const updateTherapist = () => {
        const storedToken = localStorage.getItem("token");
        const storedName = localStorage.getItem("name");

        if (storedToken && storedName) {
            setTherapist({ name: storedName });
        } else {
            setTherapist(null);
        }
    };

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");

        updateTherapist();
        window.addEventListener("userLoggedIn", updateTherapist);

        return () => {
            window.removeEventListener("userLoggedIn", updateTherapist);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setTherapist(null);
        navigate("/login");
    };

    return (
        <div className="bg-green-900 text-white p-4 flex items-center justify-between shadow-lg">
            <div className="text-lg font-semibold">
                {greeting}, {therapist?.name || "Therapist"}
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

export default TherapistNavbar;