import React, { useEffect, useState } from "react";
import axios from "axios";

const SystemSettings = () => {
    const [settings, setSettings] = useState({
        rolePermissions: {
            manageUsers: true,
            viewReports: true,
            editContent: false,
        },
        notifications: {
            email: true,
            sms: false,
            inApp: true,
            alertThreshold: "medium",
            frequency: "daily",
            recipients: ["admin@example.com"],
        },
        maintenanceMode: {
            enabled: false,
            customMessage: "",
            scheduledWindow: "",
        },
        backup: {
            autoBackup: true,
            backupFrequency: "daily",
            storageLocation: "cloud",
            oneClickRestore: false,
        },
        customization: {
            logo: "",
            colorScheme: "light",
            language: "en",
            timezone: "UTC",
            dateFormat: "YYYY-MM-DD",
            currency: "USD",
        },
    });

    const [message, setMessage] = useState("");

    // Fetch system settings from the backend
    useEffect(() => {
        const fetchSystemSettings = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/api/system/settings", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSettings(res.data);
            } catch (err) {
                setMessage("Failed to fetch system settings.");
            }
        };

        fetchSystemSettings();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:3000/api/system/settings", settings, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("System settings updated successfully!");
        } catch (err) {
            setMessage("Failed to update system settings.");
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setSettings((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === "checkbox" ? checked : value,
                },
            }));
        } else {
            setSettings((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">System Settings</h1>

                {message && (
                    <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-sm">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div>
                            {/* Role and Permission Management */}
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Role and Permissions</h2>
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="rolePermissions.manageUsers"
                                            checked={settings.rolePermissions.manageUsers}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Manage Users
                                    </label>
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="rolePermissions.viewReports"
                                            checked={settings.rolePermissions.viewReports}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        View Reports
                                    </label>
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="rolePermissions.editContent"
                                            checked={settings.rolePermissions.editContent}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Edit Content
                                    </label>
                                </div>
                            </section>

                            {/* Notification and Alert Settings */}
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Notifications and Alerts</h2>
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="notifications.email"
                                            checked={settings.notifications.email}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Email Notifications
                                    </label>
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="notifications.sms"
                                            checked={settings.notifications.sms}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        SMS Notifications
                                    </label>
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="notifications.inApp"
                                            checked={settings.notifications.inApp}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        In-App Notifications
                                    </label>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Alert Threshold</label>
                                        <select
                                            name="notifications.alertThreshold"
                                            value={settings.notifications.alertThreshold}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Notification Frequency</label>
                                        <select
                                            name="notifications.frequency"
                                            value={settings.notifications.frequency}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div>
                            {/* System Maintenance Mode */}
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Maintenance Mode</h2>
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="maintenanceMode.enabled"
                                            checked={settings.maintenanceMode.enabled}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Enable Maintenance Mode
                                    </label>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Custom Message</label>
                                        <input
                                            type="text"
                                            name="maintenanceMode.customMessage"
                                            value={settings.maintenanceMode.customMessage}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Scheduled Window</label>
                                        <input
                                            type="datetime-local"
                                            name="maintenanceMode.scheduledWindow"
                                            value={settings.maintenanceMode.scheduledWindow}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Data Backup and Recovery Settings */}
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Data Backup</h2>
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="backup.autoBackup"
                                            checked={settings.backup.autoBackup}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Enable Auto Backup
                                    </label>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Backup Frequency</label>
                                        <select
                                            name="backup.backupFrequency"
                                            value={settings.backup.backupFrequency}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Storage Location</label>
                                        <select
                                            name="backup.storageLocation"
                                            value={settings.backup.storageLocation}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="cloud">Cloud</option>
                                            <option value="local">Local Server</option>
                                        </select>
                                    </div>
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            name="backup.oneClickRestore"
                                            checked={settings.backup.oneClickRestore}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Enable One-Click Restore
                                    </label>
                                </div>
                            </section>

                            {/* Customization and Branding */}
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Customization</h2>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Logo URL</label>
                                        <input
                                            type="text"
                                            name="customization.logo"
                                            value={settings.customization.logo}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Color Scheme</label>
                                        <select
                                            name="customization.colorScheme"
                                            value={settings.customization.colorScheme}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Language</label>
                                        <select
                                            name="customization.language"
                                            value={settings.customization.language}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Timezone</label>
                                        <select
                                            name="customization.timezone"
                                            value={settings.customization.timezone}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="UTC">UTC</option>
                                            <option value="EST">EST</option>
                                            <option value="PST">PST</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Date Format</label>
                                        <select
                                            name="customization.dateFormat"
                                            value={settings.customization.dateFormat}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Currency</label>
                                        <select
                                            name="customization.currency"
                                            value={settings.customization.currency}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                            <option value="GBP">GBP</option>
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

export default SystemSettings;