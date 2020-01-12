import React from "react";
import { List, Grid, Button, Checkbox } from "semantic-ui-react";
import "./index.css";

const TaskList = ({ list, onCheckBoxClicked }) => {
  return (
    <List celled>
      {list.map((item, index) => (
        <List.Item key={index}>
          <Grid verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={13}>
                <List.Content>
                  <Checkbox
                    label={item}
                    className="taskCheckbox"
                    onMouseUp={() => onCheckBoxClicked(index)}
                  />
                </List.Content>
              </Grid.Column>
              <Grid.Column width={3}>
                <List.Content floated="right">
                  <Button icon="trash" size="tiny" circular></Button>
                </List.Content>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </List.Item>
      ))}
    </List>
  );
};

export default TaskList;
