const express = require('express');
const reviewService = require('../services/reviewService');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user reviews
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await reviewService.getUserReviews(req.user.id);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create review
router.post('/', auth, async (req, res) => {
  const { tool, rating, comment } = req.body;
  try {
    const review = await reviewService.createReview(req.user.id, tool, rating, comment);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
