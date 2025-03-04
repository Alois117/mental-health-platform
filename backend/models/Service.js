const mongoose = require("mongoose"); // Add this line

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["online", "offline"], default: "online" },
    sessionDuration: { type: Number, required: true }, // Duration in minutes
    pricing: {
        basic: { type: Number, required: true },
        premium: { type: Number, required: true },
        enterprise: { type: Number, required: true },
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", serviceSchema);