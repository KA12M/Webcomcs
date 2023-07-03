import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, InputRef } from "antd";

import { useStore } from "../../store/store";
import RegisterForm from "./RegisterForm";

const LoginForm = () => {
  const {
    userStore: { login, Loading },
    modalStore: { openModal },
  } = useStore();

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onFinish = async (values: any) => {
    await login({ email: values.email, password: values.password });
  };

  return (
    <>
      <Form
        initialValues={{ remember: true, email: "", password: "" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
        >
          <Input
            ref={inputRef}
            prefix={<UserOutlined />}
            placeholder="อีเมล ชื่อผู้ใช้ และ รหัสนักศึกษา"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "กรุณากรอกข้อมูล!" },
            { min: 6, message: "อย่างน้อย 6 ตัวอักษร" },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="รหัสผ่าน"
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button loading={Loading} type="primary" htmlType="submit">
              เข้าสู่ระบบ
            </Button>
            <Button
              type="default"
              htmlType="button"
              onClick={() => openModal(<RegisterForm />, "ลงทะเบียน")}
            >
              ลงทะเบียน
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default observer(LoginForm);
