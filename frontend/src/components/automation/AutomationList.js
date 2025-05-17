import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AutomationForm from './AutomationForm';
import {
  fetchAutomations,
  createAutomation,
  updateAutomation,
  deleteAutomation,
} from '../../features/automation/automationSlice';

const AutomationList = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { automations, loading } = useSelector((state) => state.automation);  // changed from state.automations to state.automation
  const [open, setOpen] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState(null);

  useEffect(() => {
    dispatch(fetchAutomations(projectId));
  }, [dispatch, projectId]);

  const handleCreate = (automationData) => {
    dispatch(createAutomation({ ...automationData, projectId }));
  };

  const handleUpdate = (automationData) => {
    dispatch(
      updateAutomation({
        id: selectedAutomation._id,
        automationData: { ...automationData, projectId },
      })
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this automation?')) {
      dispatch(deleteAutomation(id));
    }
  };

  const handleEdit = (automation) => {
    setSelectedAutomation(automation);
    setOpen(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Automations</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedAutomation(null);
            setOpen(true);
          }}
        >
          New Automation
        </Button>
      </Box>

      <Grid container spacing={3}>
        {automations.map((automation) => (
          <Grid item xs={12} md={6} key={automation._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {automation.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {automation.description}
                </Typography>
                <Typography variant="body2">
                  <strong>Trigger:</strong> {automation.trigger.replace(/\./g, ' ')}
                </Typography>
                <Typography variant="body2">
                  <strong>Action:</strong> {automation.action.replace(/\./g, ' ')}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(automation)}
                  title="Edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(automation._id)}
                  title="Delete"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AutomationForm
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedAutomation(null);
        }}
        onSubmit={selectedAutomation ? handleUpdate : handleCreate}
        initialValues={selectedAutomation}
      />
    </Box>
  );
};

export default AutomationList;