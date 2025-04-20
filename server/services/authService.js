const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup Service
const signupService = async (username, email, password, role) => {
  try {
    console.log('Signup service called with:', { username, email, role }); // Log input parameters

    // Validate input
    if (!username || !email || !password || !role) {
      throw new Error('All fields are required');
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    console.log('Saving user to database:', user); // Log the user object before saving
    await user.save();

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    console.log('Signup successful, returning response'); // Log success
    return { token, user: { id: user._id, username: user.username, email: user.email, role: user.role } };
  } catch (error) {
    console.error('Signup Service Error:', error.message); // Log the error message
    throw new Error(error.message);
  }
};

// Login Service
const loginService = async (email, password) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { token, user: { id: user._id, username: user.username, email: user.email, role: user.role } };
  } catch (error) {
    console.error('Login Service Error:', error.message);
    throw new Error(error.message);
  }
};

module.exports = { signupService, loginService };
