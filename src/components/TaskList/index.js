import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
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
      {list.map((item, index) => (
        <Fragment key={`${item}_${index}`}>
          <ListItem dense className={classes.listItem}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                onChange={() => onCheckBoxClicked(index)}
              />
            </ListItemIcon>
            <ListItemText primary={item} />
            <ListItemSecondaryAction>
              <DeleteForeverIcon edge="end" aria-label="comments">
                <CommentIcon />
              </DeleteForeverIcon>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

export default TaskList;
