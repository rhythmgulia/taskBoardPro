import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 2,
            backgroundColor: snapshot.isDragging ? 'action.hover' : 'background.paper',
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="div" gutterBottom>
                {task.title}
              </Typography>
              <Box>
                <IconButton size="small" onClick={() => onEdit(task)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete(task._id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {task.description}
            </Typography>
            <Box display="flex" gap={1} mt={1}>
              <Chip
                label={task.priority}
                size="small"
                color={task.priority === 'High' ? 'error' : 'default'}
              />
              {task.dueDate && (
                <Chip
                  label={new Date(task.dueDate).toLocaleDateString()}
                  size="small"
                />
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;