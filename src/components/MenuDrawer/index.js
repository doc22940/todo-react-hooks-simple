import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import ProjectDialog from "../ProjectDialog";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const MenuDrawer = ({
  mobileOpen,
  handleDrawerToggle,
  handleProjectClick,
  handleProjectRemove
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [menuProjects, setMenuProjects] = useState([]);
  const [nestedOpen, setNestedOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [project, setProject] = useState("");

  const handleClick = () => {
    setNestedOpen(!nestedOpen);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = event => {
    setDialogOpen(false);
    console.log(event);
  };

  const handleAlertDialogClose = () => {
    setAlertDialogOpen(false);
  };

  const onProjectSubmit = event => {
    if (!menuProjects.includes(project)) {
      const updatedMenuProjects = [...menuProjects, project];
      setMenuProjects(updatedMenuProjects);
    } else {
      // Don't create the object and tell the user it already exists
      setAlertDialogOpen(true);
    }

    setProject("");
    event.preventDefault();
  };

  const onDialogInputChange = event => setProject(event.target.value);

  const removeProject = project => {
    const updatedMenuProjects = menuProjects.filter(item => item != project);
    console.log(project);
    console.log(menuProjects);
    console.log(updatedMenuProjects);
    setMenuProjects(updatedMenuProjects);

    handleProjectRemove(project);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {/* Add Inbox as default project */}
        <ListItem
          button
          key={"Inbox"}
          onClick={() => handleProjectClick("Inbox")}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Inbox"} />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="Project" />
          {nestedOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
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
      </List>
      <ProjectDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        value={project}
        onChange={onDialogInputChange}
        onSubmit={onProjectSubmit}
      />
      <Dialog
        open={alertDialogOpen}
        onClose={handleAlertDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"This project already exists."}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleAlertDialogClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default MenuDrawer;
