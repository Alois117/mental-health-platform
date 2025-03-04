const User = require("../models/Users");

// Fetch all subscribed patients
const getSubscribedPatients = async (req, res) => {
    try {
        const patients = await User.find({ role: "patient", subscriptionType: { $exists: true } });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: "Error fetching patients" });
    }
};

// Fetch all therapists
const getTherapists = async (req, res) => {
    try {
        const therapists = await User.find({ role: "therapist" });
        res.json(therapists);
    } catch (error) {
        res.status(500).json({ message: "Error fetching therapists" });
    }
};

// Assign therapist to patient
const assignTherapist = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { therapistId } = req.body;
        await User.findByIdAndUpdate(patientId, { assignedTherapist: therapistId });
        res.json({ message: "Therapist assigned successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error assigning therapist" });
    }
};

// Fetch all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude passwords
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

// Update user status
const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { isActive } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isActive },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: `User ${isActive ? "activated" : "deactivated"} successfully!` });
    } catch (error) {
        res.status(500).json({ message: "Error updating user status" });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password, role, subscriptionType } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password, // Note: In a real app, hash the password before saving
            role,
            subscriptionType: role === "patient" ? subscriptionType : undefined, // Only patients have subscriptionType
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully!", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
    }
};

module.exports = {
    getSubscribedPatients,
    getTherapists,
    assignTherapist,
    getUsers,
    updateUserStatus,
    createUser,
};