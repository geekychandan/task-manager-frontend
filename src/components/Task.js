import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Delete, Edit, CheckCircle } from "@material-ui/icons";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginBottom: theme.spacing(1),
    border: "1px solid black",
    borderRadius: "5px",
  },
}));

const Task = ({ task, handleDelete, handleEdit, handleComplete }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem}>
      <ListItemIcon>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="complete task"
          onClick={() => handleComplete(task._id)}
        >

          {task.completed?<CheckCircleIcon color="primary" />:<CheckCircle />}
          
        </IconButton>
      </ListItemIcon>
      <ListItemText
        primary={task.title}
        secondary={task.description}
        // secondaryTypographyProps={task.dueDate}
      />
      <Typography variant="subtitle2" color="primary" style={{marginRight:'10%'}}>
  {task.dueDate.slice(0,10)}
</Typography>
      {/* <ListItemText primary={task.dueDate} /> */}
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="edit task"
          onClick={() => handleEdit(task)}
        >
          <Edit />
        </IconButton>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="delete task"
          onClick={() => handleDelete(task._id)}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Task;
