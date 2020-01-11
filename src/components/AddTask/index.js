import React from "react";
import { Form } from "semantic-ui-react";

const AddTask = ({ value, onSubmit, onChange }) => {
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="Task"
            name="task"
            value={value}
            onChange={onChange}
          />
          <Form.Button content="Add Task" />
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddTask;
