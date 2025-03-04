import React, { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        notifications: {
            email: true,
            push: false,
        },
        privacy: {
            dataSharing: false,
            profileVisibility: "public",
        },
        language: "en",
        theme: "light",
    });

    const [message, setMessage] = useState("");

    // Fetch user settings from the backend
    useEffect(() => {
        const fetchUserSettings = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/api/user/settings", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
            } catch (err) {
                setMessage("Failed to fetch user settings.");
            }
        };

        fetchUserSettings();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:3000/api/user/settings", user, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("Settings updated successfully!");
        } catch (err) {
            setMessage("Failed to update settings.");
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setUser((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === "checkbox" ? checked : value,
                },
            }));
        } else {
            setUser((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h1>

                {message && (
                    <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-sm">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div>
                            {/* Profile Management */}
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Profile Management</h2>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={user.name}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Change Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Notification Preferences */}
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Notification Preferences</h2>
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="notifications.email"
                                            checked={user.notifications.email}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Email Notifications
                                    </label>
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="notifications.push"
                                            checked={user.notifications.push}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Push Notifications
                                    </label>
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div>
                            {/* Privacy Settings */}
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Privacy Settings</h2>
                                <div className="space-y-3">
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="privacy.dataSharing"
                                            checked={user.privacy.dataSharing}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Allow Data Sharing
                                    </label>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Profile Visibility</label>
                                        <select
                                            name="privacy.profileVisibility"
                                            value={user.privacy.profileVisibility}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* Language and Theme */}
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Language and Theme</h2>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Language</label>
                                        <select
                                            name="language"
                                            value={user.language}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Theme</label>
                                        <select
                                            name="theme"
                                            value={user.theme}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                        </select>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg text-sm hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;