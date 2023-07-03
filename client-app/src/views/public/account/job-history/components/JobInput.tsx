import { Form, Input } from "antd";

const JobInput = ({ name, label, required = false }: any) => {
  return (
    <Form.Item
      label={label}
      name={name}
      required={required}
      rules={[required && { required: true, message: "กรุณากรอกข้อมูล" }]}
    >
      <Input />
    </Form.Item>
  );
};

export default JobInput;
