import React, { Fragment, useState } from "react";
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
import ProjectDialog from "../../ProjectDialog";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const CollapsableMenu = ({ dispatch, nestedOpen, projects, removeProject }) => {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = event => {
    setDialogOpen(false);
    console.log(event);
  };

  const handleProjectClick = project => {
    dispatch({ type: "PROJECT_SELECTED", name: project });
  };

  return (
    <Fragment>
      <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {projects
            .filter(project => project.name != "Inbox")
            .map(project => (
              <ListItem
                button
                key={project.name}
                onClick={() => handleProjectClick(project.name)}
                className={classes.nested}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={project.name} />
                <ListItemSecondaryAction onClick={() => removeProject(project)}>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          <ListItem
            button
            className={classes.nested}
            onClick={handleDialogOpen}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Project" />
          </ListItem>
        </List>
      </Collapse>
      <ProjectDialog
        dispatch={dispatch}
        projects={projects}
        open={dialogOpen}
        handleClose={handleDialogClose}
      />
    </Fragment>
  );
};

export default CollapsableMenu;
