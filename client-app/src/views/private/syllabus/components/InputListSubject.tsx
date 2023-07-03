import React from "react";
import { Button, Form, Input, InputNumber, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
  name: string;
}

const InputListSubject = ({ name }: Props) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, i) => (
            <Space
              key={i}
              align="center"
              style={{ display: "flex", width: "100%", marginBottom: 8 }}
            >
              <Form.Item 
                name={[field.name, "name"]}
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                required
                noStyle
              >
                <Input placeholder="วิชา" />
              </Form.Item>

              <Form.Item 
                name={[field.name, "credit"]}
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                required
                noStyle
              >
                <InputNumber placeholder="หน่วยกิต" min={1} />
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

export default InputListSubject;
