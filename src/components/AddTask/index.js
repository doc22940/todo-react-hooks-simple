import React from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const AddTask = ({ value, onSubmit, onChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Grid container direction="row" alignItems="flex-end">
          <Grid item xs={8}>
            <Input placeholder="Task" value={value} onChange={onChange} />
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
