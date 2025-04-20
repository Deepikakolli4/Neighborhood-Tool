const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup Service
const signupService = async (name, email, password, role) => {
  let user = await User.findOne({ email });
  if (user) throw new Error('User already exists');

  user = new User({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: role || 'member',
  });

  await user.save();

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return { token, user: { id: user._id, name, email, role: user.role } };
};

// Login Service
const loginService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return { token, user: { id: user._id, name: user.name, email, role: user.role } };
};

// Get User Profile Service
const getUserProfileService = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

module.exports = {
  signupService,
  loginService,
  getUserProfileService,
};
