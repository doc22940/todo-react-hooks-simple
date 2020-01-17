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

const CollapsableMenuItem = ({
  dispatchMenuItemSelected,
  dispatchMenuItems,
  name,
  id,
  type,
  icon,
  menuItemSelected,
  inboxItem,
  handleDrawerClick
}) => {
  const classes = useStyles();

  const handleItemClick = name => {
    dispatchMenuItemSelected({
      type: `${type}_SELECTED`,
      id: id,
      name: name,
      menu: type
    });

    handleDrawerClick();
  };

  const handleDeleteItem = () => {
    dispatchMenuItems({ type: "DELETE", id: id });
    // If the deleted item is the selected one
    if (menuItemSelected.id == id) {
      // Select the Inbox
      dispatchMenuItemSelected({
        type: `${type}_SELECTED`,
        ...inboxItem
      });
    }
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
      <ListItemSecondaryAction onClick={() => handleDeleteItem()}>
        <IconButton edge="end" aria-label="delete">
          <DeleteForeverIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CollapsableMenuItem;
