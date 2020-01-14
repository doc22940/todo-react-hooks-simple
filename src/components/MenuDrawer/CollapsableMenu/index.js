import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const CollapsableMenu = ({
  nestedOpen,
  menuProjects,
  handleProjectClick,
  removeProject,
  handleDialogOpen
}) => {
  const classes = useStyles();

  return (
    <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {menuProjects.map(text => (
          <ListItem
            button
            key={text}
            onClick={() => handleProjectClick(text)}
            className={classes.nested}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
            <ListItemSecondaryAction onClick={() => removeProject(text)}>
              <IconButton edge="end" aria-label="delete">
                <DeleteForeverIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem button className={classes.nested} onClick={handleDialogOpen}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Project" />
        </ListItem>
      </List>
    </Collapse>
  );
};

export default CollapsableMenu;
