import React from "react";
import List from "@material-ui/core/List";
import Task from "./Task";

const TaskList = ({
  list,
  onCheckBoxClicked,
  onDeleteClicked,
  showCompleted
}) => {
  return (
    <List>
      {list
        .filter(item => item.completed == false && item.deleted == false)
        .map(item => (
          <Task
            key={item.id}
            onDeleteClicked={onDeleteClicked}
            onCheckBoxClicked={onCheckBoxClicked}
            disabled={false}
            item={item}
          />
        ))}
      {/* Show the completed task at the end */}
      {showCompleted
        ? list
            .filter(item => item.completed == true && item.deleted == false)
            .map(item => (
              <Task
                key={item.id}
                onDeleteClicked={onDeleteClicked}
                onCheckBoxClicked={onCheckBoxClicked}
                disabled={true}
                item={item}
              />
            ))
        : ""}
    </List>
  );
};

export default TaskList;
