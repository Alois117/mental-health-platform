const mongoose = require("mongoose"); // Add this line

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["patient", "therapist"], required: true },
    isActive: { type: Boolean, default: true },
    subscriptionType: { type: String, enum: ["basic", "premium", "enterprise"], default: "basic" },
    assignedTherapist: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Only for patients
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", userSchema);