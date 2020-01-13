import React, { useState, Fragment } from "react";
import AddTask from "../AddTask";
import TaskList from "../../components/TaskList";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const App = () => {
  const theme = createMuiTheme();

  theme.typography.h1 = {
    fontSize: "2rem"
  };

  const [taskDescription, setTaskDescription] = useState("");
  const [tasksList, setTasksList] = useState([]);

  const onInputChange = event => setTaskDescription(event.target.value);

  const onTaskSubmit = event => {
    const id = tasksList.length;
    const task = { id: id, name: taskDescription, completed: false };
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

  return (
    <Fragment>
      <CssBaseline />
      <div>
        <ThemeProvider theme={theme}>
          <Typography variant="h1" gutterBottom>
            Inbox
          </Typography>
          <Container maxWidth="sm">
            <TaskList list={tasksList} onCheckBoxClicked={onCheckBoxClicked} />
            <AddTask
              value={taskDescription}
              onSubmit={onTaskSubmit}
              onChange={onInputChange}
            />
          </Container>
        </ThemeProvider>
      </div>
    </Fragment>
  );
};

export default App;