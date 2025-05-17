const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const auth = require('../middleware/auth');
const projectAccess = require('../middleware/projectAccess');
const router = express.Router();

// Create project
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      owner: req.user._id,
      members: [req.user._id]
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all user's projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id
    }).populate('owner members', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project
router.get('/:id', auth, projectAccess, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner members', 'name email');
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project
router.patch('/:id', auth, projectAccess, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add member to project
router.post('/:id/members', auth, projectAccess, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const project = req.project;
    if (!project.members.includes(user._id)) {
      project.members.push(user._id);
      await project.save();
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;