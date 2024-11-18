// controllers/userController.js
const { User } = require('../models'); // Import the User model
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token generation

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body; // Capture role if provided

  console.log('Received registration request:', req.body); // Log incoming data

  // Basic validation
  if (!name || !email || !password) {
    console.log('Validation failed: Missing fields'); // Log validation error
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ where: { email } });
    if (user) {
      console.log('Registration failed: User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'User', // Assign default role if not provided
    });

    console.log('User registered successfully:', email);

    // Generate JWT token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with both token and user data
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: payload, // Pass user details to the frontend
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('Received login request:', req.body);

  // Basic validation
  if (!email || !password) {
    console.log('Validation failed: Missing fields');
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Login failed: User does not exist');
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login failed: Incorrect password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User logged in successfully:', email);

    // Generate JWT token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send both token and user details in response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: payload, // Pass user details to the frontend
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile (protected route)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Get Profile error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
