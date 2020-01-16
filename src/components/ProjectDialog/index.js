import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ProjectDialog = ({ dispatch, projects, open, handleClose }) => {
  const [project, setProject] = useState("");
  const [alertDialog, setAlertDialog] = useState(false);

  const handleSubmit = event => {
    console.log(project);
    console.log("dispatch add");
    // Check if project already exists
    if (project) {
      if (!projects.some(item => item.name == project)) {
        console.log("dispatch add project");
        dispatch({ type: "ADD_PROJECT", name: project, selected: false });
      } else {
        setAlertDialog(true);
      }
    }

    setProject("");
    event.preventDefault();
  };

  const handleChange = event => {
    console.log(`handleChange: ${project}`);
    setProject(event.target.value);
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
        <DialogTitle id="form-dialog-title">Project Name</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the project name</DialogContentText>
          <form id="projectName" onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              id="name"
              label="Project Name"
              type="text"
              fullWidth
              value={project}
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
          {"This project already exists."}
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

export default ProjectDialog;
