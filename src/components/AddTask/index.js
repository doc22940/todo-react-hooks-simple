import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import uuid from "uuid/v4";

const AddTask = ({ dispatch, project }) => {
  const [task, setTask] = useState("");

  const handleSubmit = event => {
    if (task) {
      dispatch({
        type: "ADD_TODO",
        id: uuid(),
        name: task,
        project: project,
        label: "none",
        completed: false,
        delete: false
      });
    }

    setTask("");
    event.preventDefault();
  };

  const handleChange = event => setTask(event.target.value);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container direction="row" alignItems="flex-end">
          <Grid item xs={8}>
            <Input placeholder="Task" value={task} onChange={handleChange} />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" type="submit">
              Add Task
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddTask;
