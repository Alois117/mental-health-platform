const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import MongoDB connection function
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
console.log("Auth routes loaded...");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); 

// Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api", userRoutes);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
