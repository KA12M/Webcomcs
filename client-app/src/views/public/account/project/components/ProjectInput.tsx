import { Form, Input } from "antd";
import { Rule } from "antd/es/form";

const ProjectInput = ({
  label,
  name,
  required = true,
  help,
  rules = [],
}: {
  label: string;
  name: string;
  required?: boolean;
  help?: any;
  rules?: Rule[];
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      required={required}
      rules={[...rules!, { required, message: "กรุณากรอกข้อมูล" }]}
      help={help}
    >
      <Input />
    </Form.Item>
  );
};

export default ProjectInput;
