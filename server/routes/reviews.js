const express = require('express');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user reviews
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id }).populate('tool');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create review
router.post('/', auth, async (req, res) => {
  const { tool, rating, comment } = req.body;
  try {
    const review = new Review({
      tool,
      user: req.user.id,
      rating,
      comment,
    });
    await review.save(); // Fixed indentation
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;