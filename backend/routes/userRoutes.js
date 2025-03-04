const express = require("express");
const {
    getSubscribedPatients,
    getTherapists,
    assignTherapist,
    getUsers,
    updateUserStatus,
    createUser,
} = require("../controllers/userController");

const router = express.Router();

// Existing routes for AdminServices
router.get("/patients/subscribed", getSubscribedPatients);
router.get("/therapists", getTherapists);
router.post("/patients/:patientId/assign-therapist", assignTherapist);

// New routes for UserManagement
router.get("/users", getUsers); // Fetch all users
router.put("/users/:userId/status", updateUserStatus); // Update user status
router.post("/users", createUser); // Create a new user

module.exports = router;