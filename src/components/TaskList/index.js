import React from "react";
import { List, Checkbox } from "semantic-ui-react";

const TaskList = () => (
  <List divided relaxed>
    <List.Item>
      <List.Content>
        <Checkbox label="Breakfast" />
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <Checkbox label="Lunch" />
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <Checkbox label="Dinner" />
      </List.Content>
    </List.Item>
  </List>
);

export default TaskList;
