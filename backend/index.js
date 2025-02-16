const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// Import MongoDB connection function
const connectDB = require('./config/db');

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

// Import Routes
const authRoutes = require('./routes/authRoutes');
console.log("Auth routes loaded...");
app.use('/api/auth', authRoutes);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
