import React from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from "@material-ui/icons/Inbox";
import LabelIcon from "@material-ui/icons/Label";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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

const MenuDrawer = ({
  dispatchMenuItemSelected,
  dispatchMenuItems,
  menuItems,
  mobileOpen,
  handleDrawerToggle,
  menuItemSelected
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const inboxItem = { ...menuItems[0] };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {/* Add Inbox as default project */}
        <ListItem
          button
          key={inboxItem.name}
          onClick={() =>
            dispatchMenuItemSelected({
              type: "PROJECT_SELECTED",
              ...inboxItem
            })
          }
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={inboxItem.name} />
        </ListItem>
        <CollapsableMenu
          dispatchMenuItemSelected={dispatchMenuItemSelected}
          dispatchMenuItems={dispatchMenuItems}
          items={menuItems.filter(item => item.menu == "PROJECT")}
          label="Projects"
          type="PROJECT"
          icon={<InboxIcon />}
          menuItemSelected={menuItemSelected}
          inboxItem={inboxItem}
        />
        <CollapsableMenu
          dispatchMenuItemSelected={dispatchMenuItemSelected}
          dispatchMenuItems={dispatchMenuItems}
          items={menuItems.filter(item => item.menu == "LABEL")}
          label="Labels"
          type="LABEL"
          icon={<LabelIcon />}
          menuItemSelected={menuItemSelected}
          inboxItem={inboxItem}
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
