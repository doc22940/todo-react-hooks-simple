import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const CollapsableMenuItem = ({ dispatch, project }) => {
  const classes = useStyles();

  const handleProjectClick = project => {
    dispatch({ type: "PROJECT_SELECTED", name: project });
  };

  const handleDeleteProject = project => {
    dispatch({ type: "PROJECT_DELETED", name: project });
  };

  return (
    <ListItem
      button
      onClick={() => handleProjectClick(project)}
      className={classes.nested}
    >
      {/** Icon to show */}
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={project} />
      <ListItemSecondaryAction onClick={() => handleDeleteProject(project)}>
        <IconButton edge="end" aria-label="delete">
          <DeleteForeverIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CollapsableMenuItem;
