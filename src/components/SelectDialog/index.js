import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import uuid from "uuid/v4";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const SelectedDialog = ({
  openDialog,
  handleClose,
  title,
  dispatch,
  taskId,
  labels
}) => {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const handleChange = event => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    console.log("add label submit");
    dispatch({ type: "ADD_LABEL", id: taskId, labelId: value });

    event.preventDefault();
  };

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openDialog}
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <form
            className={classes.container}
            onSubmit={handleSubmit}
            id="formDialog"
          >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="add-label">Label</InputLabel>
              <Select
                native
                value={value}
                onChange={handleChange}
                input={<Input id="add-label" />}
              >
                <option value="none">None</option>
                {labels.map(label => (
                  <option key={uuid()} value={label.id}>
                    {label.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            type="submit"
            form="formDialog"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SelectedDialog;
