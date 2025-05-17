import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from '@mui/material';

const TRIGGERS = [
  'task.status.changed',
  'task.assigned',
  'task.dueDate.approaching',
];

const ACTIONS = [
  'change.status',
  'assign.user',
  'send.notification',
  'add.label',
];

const AutomationForm = ({ open, onClose, onSubmit, initialValues = {} }) => {
  const [automation, setAutomation] = React.useState({
    name: '',
    description: '',
    trigger: TRIGGERS[0],
    action: ACTIONS[0],
    conditions: '',
    ...initialValues,
  });

  const handleSubmit = () => {
    onSubmit(automation);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialValues._id ? 'Edit Automation' : 'Create Automation'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Name"
            fullWidth
            value={automation.name}
            onChange={(e) => setAutomation({ ...automation, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={automation.description}
            onChange={(e) =>
              setAutomation({ ...automation, description: e.target.value })
            }
          />
          <FormControl fullWidth>
            <InputLabel>Trigger</InputLabel>
            <Select
              value={automation.trigger}
              label="Trigger"
              onChange={(e) =>
                setAutomation({ ...automation, trigger: e.target.value })
              }
            >
              {TRIGGERS.map((trigger) => (
                <MenuItem key={trigger} value={trigger}>
                  {trigger.replace(/\./g, ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Action</InputLabel>
            <Select
              value={automation.action}
              label="Action"
              onChange={(e) =>
                setAutomation({ ...automation, action: e.target.value })
              }
            >
              {ACTIONS.map((action) => (
                <MenuItem key={action} value={action}>
                  {action.replace(/\./g, ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Conditions (JSON)"
            fullWidth
            multiline
            rows={3}
            value={automation.conditions}
            onChange={(e) =>
              setAutomation({ ...automation, conditions: e.target.value })
            }
            helperText="Enter conditions in JSON format"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {initialValues._id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AutomationForm;