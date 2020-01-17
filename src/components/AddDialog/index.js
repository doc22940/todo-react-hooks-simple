import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import uuid from "uuid/v4";

const AddDialog = ({
  dispatchMenuItems,
  items,
  label,
  type,
  open,
  handleClose
}) => {
  const [inputValue, setInputValue] = useState("");
  const [alertDialog, setAlertDialog] = useState(false);

  const handleSubmit = event => {
    console.log(inputValue);
    console.log("dispatch add");
    // Check if item already exists
    if (inputValue) {
      if (!items.some(item => item.name == inputValue)) {
        console.log("dispatch add project");
        dispatchMenuItems({
          type: `ADD_${type}`,
          id: uuid(),
          name: inputValue,
          menu: type
        });
      } else {
        setAlertDialog(true);
      }
    }

    setInputValue("");
    event.preventDefault();
  };

  const handleChange = event => {
    console.log(`handleChange: ${inputValue}`);
    setInputValue(event.target.value);
  };

  const handleAlertDialogClose = () => {
    setAlertDialog(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{`${label} name`}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Please enter the ${label.toLowerCase()} name`}</DialogContentText>
          <form id="projectName" onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              id="name"
              label={`${label} Name`}
              type="text"
              fullWidth
              value={inputValue}
              onChange={handleChange}
            />
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
            form="projectName"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={alertDialog}
        onClose={handleAlertDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`This ${label.toLowerCase()} already exists.`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleAlertDialogClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDialog;
