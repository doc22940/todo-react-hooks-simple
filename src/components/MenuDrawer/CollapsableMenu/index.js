import React, { Fragment, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import AddIcon from "@material-ui/icons/Add";
import ProjectDialog from "../../ProjectDialog";
import { makeStyles } from "@material-ui/core/styles";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CollapsableMenuItem from "./CollapsableMenuItem";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const CollapsableMenu = ({ dispatch, projects, label }) => {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(true);

  const handleClick = () => {
    setNestedOpen(!nestedOpen);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary={label} />
        {nestedOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {projects
            // Don't show "Inbox" in project
            .filter(project => project.name != "Inbox")
            .map(project => (
              <CollapsableMenuItem
                key={project.name}
                dispatch={dispatch}
                project={project.name}
              />
            ))}
          <ListItem
            button
            className={classes.nested}
            onClick={handleDialogOpen}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={`Add ${label}`} />
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
