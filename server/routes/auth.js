const express = require('express');
const authService = require('../services/authService');
const auth = require('../middleware/auth');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const response = await authService.signupService(name, email, password, role);
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await authService.loginService(email, password);
    res.json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await authService.getUserProfileService(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
