import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Typography } from "antd";
const { Text } = Typography;

import { useStore } from "../../store/store";
import LoginForm from "./LoginForm";
import { observer } from "mobx-react-lite";

const roleData = [
  { label: "บุคคลทั่วไป", value: "Guest" },
  { label: "นักศึกษา", value: "Student" },
  { label: "อาจารย์", value: "Lecturer" },
];

const RegisterForm = () => {
  const {
    modalStore,
    userStore: { Loading, register },
  } = useStore();

  const [errorList, setErrorList] = useState();
  const [role, setRole] = useState();

  const handleChange = (value: any) => {
    setRole(value);
  };

  const handleSubmit = async (values: any) => {
    await register({ ...values, role }).catch((error) => {
      setErrorList(error);
      console.log(error);
    });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      {role === "Student" && (
        <Form.Item
          name="username"
          rules={[{ required: true, message: "กรุณากรอกข้อมูล!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="รหัสนักศึกษา"
          />
        </Form.Item>
      )}
      <Form.Item
        name="fullName"
        rules={[{ required: true, message: "กรุณากรอกข้อมูล!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="ชื่อ-นามสกุล"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "กรุณากรอกข้อมูล!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="อีเมล"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "กรุณากรอกข้อมูล!" },
          { min: 8, message: "รหัสผ่านอย่างน้อย 8 อักษร" },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="รหัสผ่าน"
        />
      </Form.Item>

      <Select
        className="w-32 mb-4"
        onChange={handleChange}
        options={roleData.map((result) => result)}
        value={role}
        defaultValue={"Guest"}
      />

      <Form.Item>
        <Text type="danger">
          {errorList &&
            Array.from(errorList).map((el: any, i: any) => <p key={i}>{el}</p>)}
        </Text>
        <Space>
          <Button loading={Loading} type="primary" htmlType="submit">
            ลงทะเบียน
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={() => modalStore.openModal(<LoginForm />, "เข้าสู่ระบบ")}
          >
            เข้าสู่ระบบ
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default observer(RegisterForm);
