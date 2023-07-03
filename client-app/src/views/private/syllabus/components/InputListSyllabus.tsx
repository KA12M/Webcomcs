import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

interface Props {
  name: string;
}

const InputListSyllabus = ({ name }: Props) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Space
              key={field.key}
              align="center"
              style={{ display: "flex", width: "100%", marginBottom: 8 }}
            >
              <Form.Item
                {...field}
                name={[field.name, 'sentence']}
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                noStyle
              >
                <Input />
              </Form.Item>

              <MinusCircleOutlined onClick={() => remove(field.name)} />
            </Space>
          ))}

          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              เพิ่ม
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default InputListSyllabus;
