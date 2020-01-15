import React from "react";
import List from "@material-ui/core/List";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, dispatch, showCompleted, projectSelected }) => {
  return (
    <List>
      {tasks
        .filter(
          task =>
            task.completed == false &&
            task.deleted == false &&
            task.project == projectSelected
        )
        .map(task => (
          <TaskItem
            key={task.id}
            dispatch={dispatch}
            disabled={false}
            task={task}
          />
        ))}
      {/* Show the completed task at the end */}
      {showCompleted
        ? tasks
            .filter(
              task =>
                task.completed == true &&
                task.deleted == false &&
                task.project == projectSelected
            )
            .map(task => (
              <TaskItem
                key={task.id}
                dispatch={dispatch}
                disabled={true}
                task={task}
              />
            ))
        : ""}
    </List>
  );
};

export default TaskList;
