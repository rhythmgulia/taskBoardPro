import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskColumn from './TaskColumn';
import {
  fetchTasks,
  createTask,
  updateTaskStatus,
} from '../../features/tasks/taskSlice';

const TASK_STATUS = ['To Do', 'In Progress', 'Done'];

const TaskBoard = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
  });

  useEffect(() => {
    dispatch(fetchTasks(projectId));
  }, [dispatch, projectId]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    dispatch(updateTaskStatus({ taskId: draggableId, status: newStatus }));
  };

  const handleCreateTask = async () => {
    await dispatch(createTask({ ...newTask, projectId }));
    setOpen(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'To Do',
    });
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
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {TASK_STATUS.map((status) => (
            <Grid item xs={12} md={4} key={status}>
              <TaskColumn
                title={status}
                id={status}
                tasks={tasks.filter((task) => task.status === status)}
                onEditTask={() => {}}
                onDeleteTask={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            select
            margin="dense"
            label="Priority"
            fullWidth
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            {['Low', 'Medium', 'High'].map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateTask} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskBoard;