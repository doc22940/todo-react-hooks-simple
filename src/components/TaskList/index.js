import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
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

const TaskList = ({ list, onCheckBoxClicked }) => {
  const classes = useStyles();

  return (
    <List>
      {list
        .filter(item => item.completed == false)
        .map(item => (
          <Fragment key={item.id}>
            <ListItem dense className={classes.listItem}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  onChange={() => onCheckBoxClicked(item.id)}
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <DeleteForeverIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
    </List>
  );
};

export default TaskList;
