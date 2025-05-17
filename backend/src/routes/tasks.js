const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const projectAccess = require('../middleware/projectAccess');
const Project = require('../models/Project')
const { checkAutomations } = require('../utils/automationHelper');
const router = express.Router();

// Create task
router.post('/', auth, projectAccess, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user._id
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get project tasks
router.get('/project/:projectId', auth, projectAccess, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const project = await Project.findById(task.project);
    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const oldStatus = task.status;
    Object.assign(task, req.body);
    await task.save();

    // Check automations if status changed
    if (oldStatus !== task.status) {
      await checkAutomations(task, 'task_status_change');
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const project = await Project.findById(task.project);
    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;