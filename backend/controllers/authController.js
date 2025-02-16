// Handling the logic for registering and logging in users
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    console.log("Register endpoint hit"); // Debugging log
    console.log("Request Body:", req.body); // Log incoming request
  
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("User already exists");
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
  
      await newUser.save();
      console.log("User registered successfully");
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ message: 'Server Error', error });
    }
  };
  

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = { registerUser, loginUser };
