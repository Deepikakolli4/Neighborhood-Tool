const express = require('express');
const reservationService = require('../services/reservationService');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user reservations
router.get('/', auth, async (req, res) => {
  try {
    const reservations = await reservationService.getUserReservations(req.user.id);
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get upcoming reservations (reminders)
router.get('/reminders', auth, async (req, res) => {
  try {
    const reservations = await reservationService.getUpcomingReservations(req.user.id);
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create reservation
router.post('/', auth, async (req, res) => {
  const { tool, startDate, endDate } = req.body;
  try {
    const reservation = await reservationService.createReservation(req.user.id, tool, startDate, endDate);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
