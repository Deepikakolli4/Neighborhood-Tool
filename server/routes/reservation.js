const express = require('express');
const Reservation = require('../models/Reservation');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user reservations
router.get('/', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate('tool');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get upcoming reservations (reminders)
router.get('/reminders', auth, async (req, res) => {
  try {
    const today = new Date();
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);
    const reservations = await Reservation.find({
      user: req.user.id,
      startDate: { $gte: today, $lte: threeDaysFromNow },
    }).populate('tool');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create reservation
router.post('/', auth, async (req, res) => {
  const { tool, startDate, endDate } = req.body;
  try {
    const reservation = new Reservation({
      tool,
      user: req.user.id,
      startDate,
      endDate,
    });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;