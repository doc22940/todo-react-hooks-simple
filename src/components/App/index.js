import React, { useState, Fragment, useReducer } from "react";
import AddTask from "../AddTask";
import TaskList from "../../components/TaskList";
import Header from "../Header";
import MenuDrawer from "../MenuDrawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import uuid from "uuid/v4";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar
}));

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const task = {
        id: action.id,
        name: action.name,
        projectId: action.projectId,
        labelId: action.labelId,
        completed: false,
        deleted: false
      };
      return [...state, task];
    }
    case "DO_TODO":
      return state.map(task =>
        task.id == action.id ? { ...task, completed: true } : task
      );
    case "UNDO_TODO":
      return state.map(task =>
        task.id == action.id ? { ...task, completed: false } : task
      );
    case "DELETE_TODO":
      return state.map(task =>
        task.id == action.id ? { ...task, deleted: true } : task
      );
    case "ADD_LABEL":
      return state.map(task =>
        task.id == action.id ? { ...task, labelId: action.labelId } : task
      );
    default:
      throw new Error();
  }
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALL":
      return "ALL";
    case "SHOW_INCOMPLETE":
      return "INCOMPLETE";
    default:
      throw new Error();
  }
};

// Reducers creating items in the menu drawer
const menuItemsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LABEL":
      return [...state, { id: action.id, name: action.name, menu: "LABEL" }];
    case "ADD_PROJECT":
      return [...state, { id: action.id, name: action.name, menu: "PROJECT" }];
    case "DELETE":
      return state.filter(item => item.id != action.id);
    default:
      throw new Error();
  }
};

// Manage the project or label selected
const menuItemSelectedReducer = (state, action) => {
  switch (action.type) {
    case "LABEL_SELECTED":
      return { id: action.id, name: action.name, menu: action.menu };
    case "PROJECT_SELECTED":
      return { id: action.id, name: action.name, menu: action.menu };
    default:
      throw new Error();
  }
};

const App = () => {
  const classes = useStyles();

  const [tasks, dispatchTasks] = useReducer(taskReducer, []);
  const [filter, dispatchFilter] = useReducer(filterReducer, "INCOMPLETE");

  const [menuItems, dispatchMenuItems] = useReducer(menuItemsReducer, [
    { id: uuid(), name: "Inbox", menu: "PROJECT" }
  ]);
  const [
    menuItemSelected,
    dispatchMenuItemSelected
  ] = useReducer(menuItemSelectedReducer, { ...menuItems[0] });

  const [drawerMobileOpen, setDrawerMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerMobileOpen(!drawerMobileOpen);
  };

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Header
          title={menuItemSelected.name}
          handleToggle={handleDrawerToggle}
          dispatch={dispatchFilter}
        />
        <MenuDrawer
          dispatchMenuItemSelected={dispatchMenuItemSelected}
          dispatchMenuItems={dispatchMenuItems}
          menuItems={menuItems}
          mobileOpen={drawerMobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          menuItemSelected={menuItemSelected}
        />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container maxWidth="sm">
            <TaskList
              tasks={tasks}
              filter={filter}
              menuItems={menuItems}
              selected={menuItemSelected}
              dispatch={dispatchTasks}
            />
            {/** Don't show when clicking on label */}
            {menuItemSelected.menu !== "LABEL" ? (
              <AddTask dispatch={dispatchTasks} project={menuItemSelected.id} />
            ) : (
              ""
            )}
          </Container>
        </main>
      </div>
    </Fragment>
  );
};

export default App;
