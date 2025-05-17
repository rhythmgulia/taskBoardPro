const Project = require('../models/Project');

const projectAccess = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.body.project;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = projectAccess;