import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import uuid from "uuid/v4";
import SelectedDialog from "../../SelectDialog";

const useStyles = makeStyles(() => ({
  listItem: {
    paddingLeft: 0
  }
}));

const menuOptions = ["Labels"];

const TaskItem = ({ dispatch, task, labels }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const disable = task.completed || task.deleted;
    setDisabled(disable);
  }, [task.completed, task.deleted]);

  const handleClickCheckBox = () => {
    dispatch({ type: task.completed ? "UNDO_TODO" : "DO_TODO", id: task.id });
  };

  const handleClickDelete = () => {
    dispatch({ type: "DELETE_TODO", id: task.id });
  };

  const handleClickMore = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuMoreClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Fragment>
      <ListItem dense className={classes.listItem} disabled={disabled}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            onClick={handleClickCheckBox}
            checked={disabled}
          />
        </ListItemIcon>
        <ListItemText primary={task.name} />
        <IconButton
          aria-label="display more actions"
          edge="end"
          color="inherit"
          onClick={handleClickMore}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {menuOptions.map((option, index) => (
            <div key={uuid()}>
              <MenuItem onClick={() => handleMenuMoreClick(event, index)}>
                {option}
              </MenuItem>
            </div>
          ))}
        </Menu>
        <SelectedDialog
          openDialog={openDialog}
          handleClose={handleCloseDialog}
          title={menuOptions[selectedIndex]}
          dispatch={dispatch}
          taskId={task.id}
          labels={labels}
        />
        <ListItemSecondaryAction onClick={handleClickDelete}>
          <IconButton edge="end" aria-label="delete">
            <DeleteForeverIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default TaskItem;
