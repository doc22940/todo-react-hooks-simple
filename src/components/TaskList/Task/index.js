import React, { Fragment } from "react";
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

const Task = ({ onDeleteClicked, onCheckBoxClicked, disabled, item }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <ListItem dense className={classes.listItem} disabled={disabled}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            onClick={() => onCheckBoxClicked(item.id)}
            disabled={disabled}
            checked={disabled}
          />
        </ListItemIcon>
        <ListItemText primary={item.name} />
        <ListItemSecondaryAction onClick={() => onDeleteClicked(item.id)}>
          <IconButton edge="end" aria-label="comments">
            <DeleteForeverIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default Task;
