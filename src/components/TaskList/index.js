import React from "react";
import { List, Button, Checkbox, Grid } from "semantic-ui-react";

const TaskList = ({ list }) => {
  return (
    <List celled>
      {list.map((item, index) => (
        <List.Item key={index}>
          <Grid verticalAlign="middle" columns={2}>
            <Grid.Row>
              <Grid.Column>
                <List.Content>
                  <Checkbox label={item} />
                </List.Content>
              </Grid.Column>
              <Grid.Column>
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
