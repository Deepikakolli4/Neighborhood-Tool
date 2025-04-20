const express = require('express');
const toolService = require('../services/toolService');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Get all tools
router.get('/', async (req, res) => {
  try {
    const tools = await toolService.getAllTools();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add tool (Admin only)
router.post('/', auth, admin, async (req, res) => {
  const { name, description, category, imageUrl } = req.body;
  try {
    const tool = await toolService.addTool(name, description, category, imageUrl);
    res.status(201).json(tool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete tool (Admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const tool = await toolService.deleteTool(req.params.id);
    res.json({ message: 'Tool deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
