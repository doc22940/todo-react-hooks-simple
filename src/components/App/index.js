import React, { useState } from "react";
import AddTask from "../AddTask";
import TaskList from "../../components/TaskList";
import "./index.css";

const App = () => {
  const [taskDescription, setTaskDescription] = useState("");
  const [tasksList, setTasksList] = useState([]);

  const onInputChange = event => setTaskDescription(event.target.value);

  const onTaskSubmit = event => {
    const updatedTasksList = [...tasksList, taskDescription];
    setTasksList(updatedTasksList);
    setTaskDescription("");
    event.preventDefault();
  };

  return (
    <div className="App">
      <main>
        <h1>Inbox</h1>
        <TaskList list={tasksList} />
        <AddTask
          value={taskDescription}
          onSubmit={onTaskSubmit}
          onChange={onInputChange}
        />
      </main>
    </div>
  );
};

export default App;
