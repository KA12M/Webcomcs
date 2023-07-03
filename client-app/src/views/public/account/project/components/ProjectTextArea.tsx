import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const ProjectTextArea = ({
  label,
  name,
  rows,
}: {
  label: string;
  name: string;
  rows: number;
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
    >
      <TextArea rows={rows} />
    </Form.Item>
  );
};

export default ProjectTextArea;
