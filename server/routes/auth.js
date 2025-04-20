const express = require('express');
const authService = require('../services/authService');
const auth = require('../middleware/auth');
const User = require('../models/User'); // Ensure User model is correctly imported
const bcrypt = require('bcrypt');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request body:', req.body); // Log the request body for debugging

    const { username, email, password, role } = req.body;

    // Validate input
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Call the signup service
    const response = await authService.signupService(username, email, password, role);

    res.status(201).json(response);
  } catch (err) {
    console.error('Signup error:', err); // Log the full error object for debugging
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await authService.loginService(email, password); // Call loginService
    res.json(response);
  } catch (err) {
    console.error('Login error:', err.message); // Log the error
    res.status(400).json({ message: err.message });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await authService.getUserProfileService(req.user.id);
    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err); // Log the full error object for debugging
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
