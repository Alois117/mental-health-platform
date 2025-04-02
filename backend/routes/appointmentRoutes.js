const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes (require authentication)
router.use(authMiddleware);

// Get appointments with pagination and search
router.get("/", appointmentController.getAppointments);

// Create new appointment (accessible to users and admins)
router.post("/", appointmentController.createAppointment);

// Update appointment (accessible to therapists and admins with different permissions)
router.put("/:id", appointmentController.updateAppointment);

// Admin-specific appointment actions
router.put("/:id/status", appointmentController.updateAppointmentStatus);
router.put("/:id/assign-therapist", appointmentController.assignTherapist);

module.exports = router;