const Service = require("../models/Service");

// Fetch all services
const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: "Error fetching services" });
    }
};

// Add a new service
const addService = async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: "Error adding service" });
    }
};

module.exports = { getServices, addService };