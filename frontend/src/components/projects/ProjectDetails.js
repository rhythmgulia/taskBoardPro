import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
  CircularProgress,
} from '@mui/material';
import TaskIcon from '@mui/icons-material/Assignment';
import AutomationIcon from '@mui/icons-material/AutoFixHigh';
import { fetchProjects, setCurrentProject } from '../../features/projects/projectSlice';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    const project = projects.find((p) => p._id === projectId);
    if (project) {
      dispatch(setCurrentProject(project));
    }
  }, [dispatch, projectId, projects]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      navigate(`/projects/${projectId}/tasks`);
    } else {
      navigate(`/projects/${projectId}/automations`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  const project = projects.find((p) => p._id === projectId);

  if (!project) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Project not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {project.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {project.description}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<TaskIcon />} label="Tasks" />
          <Tab icon={<AutomationIcon />} label="Automations" />
        </Tabs>
      </Box>

      {error && (
        <Typography color="error" mb={3}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default ProjectDetails;