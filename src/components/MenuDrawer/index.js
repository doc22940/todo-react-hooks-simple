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
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CollapsableMenu from "./CollapsableMenu";

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

const MenuDrawer = ({ dispatch, projects, mobileOpen, handleDrawerToggle }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [nestedOpen, setNestedOpen] = useState(true);

  const handleClick = () => {
    setNestedOpen(!nestedOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {/* Add Inbox as default project */}
        <ListItem
          button
          key={projects[0].name}
          onClick={() =>
            dispatch({ type: "PROJECT_SELECTED", name: projects[0].name })
          }
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={projects[0].name} />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="Project" />
          {nestedOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <CollapsableMenu
          dispatch={dispatch}
          nestedOpen={nestedOpen}
          projects={projects}
        />
      </List>
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
