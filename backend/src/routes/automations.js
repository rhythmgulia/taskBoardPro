const express = require('express');
const Automation = require('../models/Automation');
const auth = require('../middleware/auth');
const projectAccess = require('../middleware/projectAccess');
const router = express.Router();

// Create automation
router.post('/', auth, projectAccess, async (req, res) => {
  try {
    const automation = new Automation({
      ...req.body,
      createdBy: req.user._id
    });
    await automation.save();
    res.status(201).json(automation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get project automations
router.get('/project/:projectId', auth, projectAccess, async (req, res) => {
  try {
    const automations = await Automation.find({ project: req.params.projectId })
      .populate('createdBy', 'name email');
    res.json(automations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update automation
router.patch('/:id', auth, async (req, res) => {
  try {
    const automation = await Automation.findById(req.params.id);
    if (!automation) {
      return res.status(404).json({ error: 'Automation not found' });
    }

    const project = await Project.findById(automation.project);
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only project owner can modify automations' });
    }

    Object.assign(automation, req.body);
    await automation.save();
    res.json(automation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete automation
router.delete('/:id', auth, async (req, res) => {
  try {
    const automation = await Automation.findById(req.params.id);
    if (!automation) {
      return res.status(404).json({ error: 'Automation not found' });
    }

    const project = await Project.findById(automation.project);
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only project owner can delete automations' });
    }

    await automation.remove();
    res.json({ message: 'Automation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;