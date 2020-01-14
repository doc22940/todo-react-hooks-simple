import React, { useState, Fragment } from "react";
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

const App = () => {
  const classes = useStyles();

  const [taskDescription, setTaskDescription] = useState("");
  const [tasksList, setTasksList] = useState([]);
  const [drawerMobileOpen, setDrawerMobileOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [project, setProject] = useState("Inbox");

  const onInputChange = event => setTaskDescription(event.target.value);

  const onTaskSubmit = event => {
    const id = tasksList.length;
    const task = {
      id: id,
      name: taskDescription,
      project: project,
      completed: false,
      deleted: false
    };
    const updatedTasksList = [...tasksList, task];

    console.log(updatedTasksList);

    setTasksList(updatedTasksList);
    setTaskDescription("");
    event.preventDefault();
  };

  const onCheckBoxClicked = taskCompletedId => {
    // Mark the task as complete
    const updatedTasksList = tasksList.map(item =>
      item.id == taskCompletedId ? { ...item, completed: true } : item
    );
    console.log(updatedTasksList);
    setTasksList(updatedTasksList);
  };

  const onDeleteClicked = taskDeletedId => {
    const updatedTasksList = tasksList.map(item =>
      item.id == taskDeletedId ? { ...item, deleted: true } : item
    );
    console.log(updatedTasksList);
    setTasksList(updatedTasksList);
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
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container fixed>
            <TaskList
              list={tasksList}
              onCheckBoxClicked={onCheckBoxClicked}
              onDeleteClicked={onDeleteClicked}
              showCompleted={showCompleted}
              projectSelected={project}
            />
            <AddTask
              value={taskDescription}
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
