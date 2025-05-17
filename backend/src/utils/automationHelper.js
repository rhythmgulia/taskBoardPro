const Automation = require('../models/Automation');
const Task = require('../models/Task');
const User = require('../models/User');

/**
 * Check and execute automations based on trigger type
 * @param {Object} task - The task that triggered the automation
 * @param {String} triggerType - Type of trigger (task_status_change, task_assignment, due_date_passed)
 */
async function checkAutomations(task, triggerType) {
  try {
    const automations = await Automation.find({
      project: task.project,
      'trigger.type': triggerType
    });

    for (const automation of automations) {
      const shouldExecute = await evaluateTriggerCondition(automation, task);
      if (shouldExecute) {
        await executeAction(automation, task);
      }
    }
  } catch (error) {
    console.error('Error in automation check:', error);
  }
}

/**
 * Evaluate if the automation trigger condition is met
 */
async function evaluateTriggerCondition(automation, task) {
  switch (automation.trigger.type) {
    case 'task_status_change':
      return task.status === automation.trigger.condition.status;

    case 'task_assignment':
      return task.assignee?.toString() === automation.trigger.condition.userId;

    case 'due_date_passed':
      return task.dueDate && new Date() > new Date(task.dueDate);

    default:
      return false;
  }
}

/**
 * Execute the automation action
 */
async function executeAction(automation, task) {
  try {
    switch (automation.action.type) {
      case 'change_status':
        await Task.findByIdAndUpdate(task._id, {
          status: automation.action.params.status
        });
        break;

      case 'assign_badge':
        const user = await User.findById(task.assignee);
        if (user) {
          // Implement badge logic here
          console.log(`Badge ${automation.action.params.badgeType} assigned to user ${user._id}`);
        }
        break;

      case 'send_notification':
        // Implement notification logic here
        console.log(`Notification sent for task ${task._id}: ${automation.action.params.message}`);
        break;
    }
  } catch (error) {
    console.error('Error executing automation action:', error);
  }
}

module.exports = {
  checkAutomations
};