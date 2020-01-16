import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, filter, dispatch, project, labels }) => {
  // Filter task according to the filter state
  const [filteredTask, setFilteredTask] = useState([]);
  useEffect(() => {
    // Filter by project selected
    const projectTasks = tasks.filter(task => task.project == project);

    const incompleteTasks = projectTasks.filter(
      task => !task.completed && !task.deleted
    );

    // case show ALL
    const completeTasks = projectTasks.filter(
      task => task.completed && !task.deleted
    );

    switch (filter) {
      case "ALL":
        // Show the complete tasks at the end.
        setFilteredTask([...incompleteTasks, ...completeTasks]);
        break;
      case "INCOMPLETE":
        setFilteredTask(incompleteTasks);
        break;
      default:
        throw new Error();
    }
  }, [filter, tasks, project]);

  return (
    <List>
      {filteredTask.map(task => (
        <TaskItem
          key={task.id}
          dispatch={dispatch}
          task={task}
          labels={labels}
        />
      ))}
    </List>
  );
};

export default TaskList;
