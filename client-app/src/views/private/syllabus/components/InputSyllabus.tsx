import React from "react";
import { Form, Input } from "antd";

interface Props {
  name: string;
  label: string;
  required?: boolean;
  rules?: any[];
}

const InputSyllabus = ({
  name,
  label,
  required = false,
  rules = [],
}: Props) => {
  return (
    <Form.Item
      name={name}
      label={label}
      required={required}
      rules={[...rules!, required && { required, message: "กรุณากรอกข้อมูล" }]}
    >
      <Input />
    </Form.Item>
  );
};

export default InputSyllabus;
