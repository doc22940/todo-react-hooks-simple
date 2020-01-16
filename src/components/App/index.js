import React, { useState, Fragment, useReducer, useEffect } from "react";
import AddTask from "../AddTask";
import TaskList from "../../components/TaskList";
import Header from "../Header";
import MenuDrawer from "../MenuDrawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

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
        project: action.project,
        label: action.label,
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
      console.log("add label");
      return state.map(task =>
        task.id == action.id ? { ...task, label: action.label } : task
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

const projectsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PROJECT":
      console.log(`project name: ${action.name}`);
      return [...state, { name: action.name, selected: action.selected }];
    case "DELETE_PROJECT":
      return;
    case "PROJECT_SELECTED":
      console.log("project selected");
      return state.map(project =>
        project.name == action.name
          ? { ...project, selected: true }
          : { ...project, selected: false }
      );
    case "PROJECT_DELETED":
      return state.filter(project => project.name != action.name);
    default:
      throw new Error();
  }
};

const labelsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LABEL":
      console.log("add label");
      return [...state, { name: action.name, selected: action.selected }];
    case "LABEL_SELECTED":
      console.log("label selected");
      return state.map(label =>
        label.name == action.name
          ? { ...label, selected: true }
          : { ...label, selected: false }
      );
    case "LABEL_DELETED":
      console.log("label deleted");
      return state.filter(label => label.name != label.name);
    default:
      throw new Error();
  }
};

const App = () => {
  const classes = useStyles();

  const [tasks, dispatchTasks] = useReducer(taskReducer, []);
  const [filter, dispatchFilter] = useReducer(filterReducer, "INCOMPLETE");
  const [projects, dispatchProjects] = useReducer(projectsReducer, [
    { name: "Inbox", selected: true }
  ]);
  const [labels, dispatchLabels] = useReducer(labelsReducer, []);

  const [projectSelected, setProjectSelected] = useState("");
  useEffect(() => {
    const selected = projects.find(item => item.selected);

    // If selected project was deleted
    // Select "Inbox"
    if (selected === undefined) {
      setProjectSelected(projects[0].name);
    } else {
      setProjectSelected(selected.name);
    }
  }, [projects]);

  const [drawerMobileOpen, setDrawerMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    console.log("handle");
    setDrawerMobileOpen(!drawerMobileOpen);
  };

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Header
          title={projectSelected}
          handleToggle={handleDrawerToggle}
          dispatch={dispatchFilter}
        />
        <MenuDrawer
          dispatch={dispatchProjects}
          dispatchLabels={dispatchLabels}
          projects={projects}
          labels={labels}
          mobileOpen={drawerMobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container fixed>
            <TaskList
              tasks={tasks}
              filter={filter}
              dispatch={dispatchTasks}
              project={projectSelected}
              labels={labels}
            />
            <AddTask dispatch={dispatchTasks} project={projectSelected} />
          </Container>
        </main>
      </div>
    </Fragment>
  );
};

export default App;
