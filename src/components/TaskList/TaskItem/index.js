import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(() => ({
  listItem: {
    paddingLeft: 0
  }
}));

const TaskItem = ({ dispatch, task }) => {
  const classes = useStyles();

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const disable = task.completed || task.deleted;
    setDisabled(disable);
  }, [task.completed, task.deleted]);

  const handleClickCheckBox = () => {
    dispatch({ type: task.completed ? "UNDO_TODO" : "DO_TODO", id: task.id });
  };

  const handleClickDelete = () => {
    dispatch({ type: "DELETE_TODO", id: task.id });
  };

  return (
    <Fragment>
      <ListItem dense className={classes.listItem} disabled={disabled}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            onClick={handleClickCheckBox}
            checked={disabled}
          />
        </ListItemIcon>
        <ListItemText primary={task.name} />
        <ListItemSecondaryAction onClick={handleClickDelete}>
          <IconButton edge="end" aria-label="delete">
            <DeleteForeverIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default TaskItem;
