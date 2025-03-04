import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
    const [users, setUsers] = useState([]); // All users
    const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users
    const [searchTerm, setSearchTerm] = useState(""); // Search term
    const [roleFilter, setRoleFilter] = useState("all"); // Role filter
    const [message, setMessage] = useState(""); // Success/error message

    // Initialize newUser state as blank
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "patient", // Default role
        subscriptionType: "basic", // Default subscription type for patients
    });

    // Fetch all users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/users");
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error.response?.data || error.message);
                setMessage("Failed to fetch users.");
            }
        };
        fetchUsers();
    }, []);

    // Handle search and filter
    useEffect(() => {
        let result = users;

        // Filter by role
        if (roleFilter !== "all") {
            result = result.filter((user) => user.role === roleFilter);
        }

        // Filter by search term (name or email)
        if (searchTerm) {
            result = result.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUsers(result);
    }, [searchTerm, roleFilter, users]);

    // Handle deactivate/activate user
    const toggleUserStatus = async (userId, isActive) => {
        try {
            await axios.put(`http://localhost:3000/api/users/${userId}/status`, {
                isActive: !isActive,
            });
            setMessage(`User ${isActive ? "deactivated" : "activated"} successfully!`);

            // Update the user list
            const updatedUsers = users.map((user) =>
                user._id === userId ? { ...user, isActive: !isActive } : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error updating user status:", error.response?.data || error.message);
            setMessage("Failed to update user status.");
        }
    };

    // Handle add new user
    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/users", newUser);
            setMessage("User created successfully!");

            // Reset the form
            setNewUser({
                name: "",
                email: "",
                password: "",
                role: "patient",
                subscriptionType: "basic",
            });

            // Refresh the user list
            const updatedUsers = await axios.get("http://localhost:3000/api/users");
            setUsers(updatedUsers.data);
            setFilteredUsers(updatedUsers.data);
        } catch (error) {
            console.error("Error creating user:", error.response?.data || error.message);
            setMessage("Failed to create user.");
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">User Management</h2>

            {/* Add New User Form */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                <form onSubmit={handleAddUser} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="patient">Patient</option>
                            <option value="therapist">Therapist</option>
                        </select>
                    </div>
                    {newUser.role === "patient" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Subscription Type</label>
                            <select
                                value={newUser.subscriptionType}
                                onChange={(e) => setNewUser({ ...newUser, subscriptionType: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            >
                                <option value="basic">Basic</option>
                                <option value="premium">Premium</option>
                                <option value="enterprise">Enterprise</option>
                            </select>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    >
                        Add User
                    </button>
                </form>
            </section>

            {/* Message */}
            {message && (
                <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-sm">
                    {message}
                </div>
            )}

            {/* Search and Filter */}
            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg flex-1"
                />
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg"
                >
                    <option value="all">All Roles</option>
                    <option value="patient">Patients</option>
                    <option value="therapist">Therapists</option>
                </select>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 capitalize">{user.role}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 text-sm rounded-full ${
                                            user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {user.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => toggleUserStatus(user._id, user.isActive)}
                                        className={`px-3 py-1 text-sm rounded-lg ${
                                            user.isActive
                                                ? "bg-red-500 text-white hover:bg-red-600"
                                                : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                    >
                                        {user.isActive ? "Deactivate" : "Activate"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;