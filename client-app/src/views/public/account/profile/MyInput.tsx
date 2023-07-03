import React from "react";
import { Form, Input } from "antd";

interface Props {
  label: string;
  name: string;
  required?: boolean;
  errors: any;
  onChange: any;
  value: any;
}

const MyInput = ({
  label,
  name,
  required = false,
  errors,
  onChange,
  value,
}: Props) => {
  return (
    <Form.Item
      label={label}
      required
      rules={[{ required, message: errors[name] }]}
    >
      <Input name={name} onChange={onChange} value={value} />
    </Form.Item>
  );
};

export default MyInput;
