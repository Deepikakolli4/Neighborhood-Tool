const express = require('express');
const DamageReport = require('../models/DamageReport');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user damage reports
router.get('/', auth, async (req, res) => {
  try {
    const reports = await DamageReport.find({ user: req.user.id }).populate('tool');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create damage report
router.post('/', auth, async (req, res) => {
  const { tool, description } = req.body;
  try {
    const report = new DamageReport({
      tool,
      user: req.user.id,
      description,
    });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;