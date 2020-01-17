import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import TaskItem from "./TaskItem";
import uuid from "uuid/v4";

const TaskList = ({ tasks, filter, dispatch, selected, menuItems }) => {
  // Filter task according to the filter state
  const [filteredTask, setFilteredTask] = useState([]);
  useEffect(() => {
    let selectedTasks = [];
    if (selected.menu == "PROJECT") {
      selectedTasks = tasks.filter(task => task.projectId === selected.id);
    } else if (selected.menu == "LABEL") {
      selectedTasks = tasks.filter(task => task.labelId === selected.id);
    }

    const incompleteTasks = selectedTasks.filter(
      task => !task.completed && !task.deleted
    );

    const completeTasks = selectedTasks.filter(
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
  }, [filter, selected.id, tasks, selected.menu]);

  return (
    <List>
      {filteredTask.map(task => (
        <TaskItem
          key={uuid()}
          dispatch={dispatch}
          task={task}
          labels={menuItems.filter(item => item.menu == "LABEL")}
        />
      ))}
    </List>
  );
};

export default TaskList;
