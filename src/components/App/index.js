import React from "react";
import AddButton from "../../components/AddButton";
import TaskList from "../../components/TaskList";
import "./index.css";

const App = () => {
  return (
    <div className="App">
      <main>
        <h1>Inbox</h1>
        <TaskList />
        <AddButton />
      </main>
    </div>
  );
};

export default App;
