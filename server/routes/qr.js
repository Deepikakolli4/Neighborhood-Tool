const express = require('express');
const QRCode = require('qrcode');
const Reservation = require('../models/Reservation');

const router = express.Router();

// Generate QR code for reservation
router.get('/reservation/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('tool');
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

    const qrData = `http://localhost:3000/reservations/${reservation._id}`;
    const qrCode = await QRCode.toDataURL(qrData);
    const base64Data = qrCode.split(',')[1]; // Extract base64 data
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(base64Data, 'base64')); // Fixed Buffer handling
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;