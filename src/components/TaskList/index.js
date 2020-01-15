import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, filter, dispatch }) => {
  // Filter task according to the filter state
  const [filteredTask, setFilteredTask] = useState([]);
  useEffect(() => {
    const incompleteTasks = tasks.filter(
      task => !task.completed && !task.deleted
    );
    const completeTasks = tasks.filter(task => task.completed && !task.deleted);

    if (filter === "ALL") {
      // Show the complete tasks at the end.
      setFilteredTask([...incompleteTasks, ...completeTasks]);
    } else if (filter === "INCOMPLETE") {
      setFilteredTask(incompleteTasks);
    }
  }, [filter, tasks]);

  return (
    <List>
      {filteredTask.map(task => (
        <TaskItem key={task.id} dispatch={dispatch} task={task} />
      ))}
    </List>
  );
};

export default TaskList;
