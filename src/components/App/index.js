import React, { useState, Fragment, useReducer } from "react";
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
        completed: false,
        deleted: false
      };
      return [...state, task];
    }
    case "DO_TODO":
      return state.map(task =>
        task.id == action.id ? { ...task, completed: true } : task
      );
    case "DELETE_TODO":
      return state.map(task =>
        task.id == action.id ? { ...task, deleted: true } : task
      );
    default:
      throw new Error();
  }
};

const App = () => {
  const classes = useStyles();

  const [tasks, dispatchTasks] = useReducer(taskReducer, []);

  const [taskName, setTaskName] = useState("");
  const [drawerMobileOpen, setDrawerMobileOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [project, setProject] = useState("Inbox");

  const onInputChange = event => setTaskName(event.target.value);

  const onTaskSubmit = event => {
    const id = tasks.length;
    if (taskName) {
      dispatchTasks({
        type: "ADD_TODO",
        id: id,
        name: taskName,
        project: "Inbox",
        completed: false,
        delete: false
      });
    }

    setTaskName("");
    event.preventDefault();
  };

  const onCheckBoxClicked = taskCompletedId => {
    dispatchTasks({ type: "DO_TODO", id: taskCompletedId });
  };

  const onDeleteClicked = taskDeletedId => {
    dispatchTasks({ type: "DELETE_TODO", id: taskDeletedId });
  };

  const handleDrawerToggle = () => {
    console.log("handle");
    setDrawerMobileOpen(!drawerMobileOpen);
  };

  const handleMenuClick = actionClicked => {
    if (actionClicked == "complete") {
      console.log("completed");
      setShowCompleted(!showCompleted);
    }
  };

  const handleProjectClick = projectClicked => {
    setProject(projectClicked);
    handleDrawerToggle;
  };

  const handleProjectRemove = project => {
    console.log("handleProjectRemove");
    console.log(tasks);
    // Switch to Inbox when a project is deleted
    setProject("Inbox");

    const updatedTasksList = tasks.map(item =>
      item.project == project ? { ...item, deleted: true } : item
    );

    console.log(updatedTasksList);
    //setTasks(updatedTasksList);
  };

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Header
          title={project}
          handleToggle={handleDrawerToggle}
          handleMenuClick={handleMenuClick}
        />
        <MenuDrawer
          mobileOpen={drawerMobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          handleMenuClick={handleMenuClick}
          handleProjectClick={handleProjectClick}
          handleProjectRemove={handleProjectRemove}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container fixed>
            <TaskList
              list={tasks}
              onCheckBoxClicked={onCheckBoxClicked}
              onDeleteClicked={onDeleteClicked}
              showCompleted={showCompleted}
              projectSelected={project}
            />
            <AddTask
              value={taskName}
              onSubmit={onTaskSubmit}
              onChange={onInputChange}
            />
          </Container>
        </main>
      </div>
    </Fragment>
  );
};

export default App;
