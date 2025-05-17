const mongoose = require('mongoose');

const automationSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  trigger: {
    type: {
      type: String,
      required: true,
      enum: ['task_status_change', 'task_assignment', 'due_date_passed']
    },
    condition: mongoose.Schema.Types.Mixed
  },
  action: {
    type: {
      type: String,
      required: true,
      enum: ['assign_badge', 'change_status', 'send_notification']
    },
    params: mongoose.Schema.Types.Mixed
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Automation', automationSchema);