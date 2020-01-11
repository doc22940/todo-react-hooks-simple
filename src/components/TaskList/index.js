import React from "react";
import { List, Checkbox } from "semantic-ui-react";

const TaskList = ({ list }) => {
  return (
    <List divided relaxed>
      {list.map((item, index) => (
        <List.Item key={index}>
          <List.Content>
            <Checkbox label={item} />
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default TaskList;
