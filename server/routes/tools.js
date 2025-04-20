const express = require('express');
const Tool = require('../models/Tool');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Get all tools
router.get('/', async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add tool (Admin only)
router.post('/', auth, admin, async (req, res) => {
  const { name, description, category, imageUrl } = req.body;
  try {
    const tool = new Tool({ name, description, category, imageUrl });
    await tool.save();
    res.status(201).json(tool);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete tool (Admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);
    if (!tool) return res.status(404).json({ message: 'Tool not found' });
    res.json({ message: 'Tool deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;