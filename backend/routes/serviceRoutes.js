const express = require("express");
const { getServices, addService } = require("../controllers/serviceController");

const router = express.Router();

// Service routes
router.get("/", getServices);
router.post("/", addService);

module.exports = router;