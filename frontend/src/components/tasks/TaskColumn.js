import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Paper, Typography, Box } from '@mui/material';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, id, onEditTask, onDeleteTask }) => {
  return (
    <Paper
      sx={{
        p: 2,
        minHeight: 500,
        backgroundColor: 'grey.100',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title} ({tasks.length})
      </Typography>
      <Droppable droppableId={id}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            minHeight={400}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};

export default TaskColumn;