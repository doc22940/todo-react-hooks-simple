import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const CollapsableMenuItem = ({ dispatch, name, type, icon }) => {
  const classes = useStyles();

  const handleItemClick = name => {
    dispatch({ type: `${type}_SELECTED`, name: name });
  };

  const handleDeleteItem = name => {
    dispatch({ type: `${type}_DELETED`, name: name });
  };

  return (
    <ListItem
      button
      onClick={() => handleItemClick(name)}
      className={classes.nested}
    >
      {/** Icon to show */}
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
      <ListItemSecondaryAction onClick={() => handleDeleteItem(name)}>
        <IconButton edge="end" aria-label="delete">
          <DeleteForeverIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CollapsableMenuItem;
