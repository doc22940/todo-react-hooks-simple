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
    const updatedTasksList = [...tasksList, taskDescription];
    setTasksList(updatedTasksList);
    setTaskDescription("");
    event.preventDefault();
  };

  const onCheckBoxClicked = taskCompletedIndex => {
    // Remove the completed task
    const updatedTasksList = tasksList.filter(
      (_, index) => taskCompletedIndex != index
    );
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
