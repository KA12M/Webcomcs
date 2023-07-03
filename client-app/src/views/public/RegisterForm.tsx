import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Typography } from "antd";
const { Text } = Typography;

import { useStore } from "../../store/store";
import LoginForm from "./LoginForm";
import { observer } from "mobx-react-lite";
import { UserRole } from "../../constants/UserRole";
import { BiVoicemail } from "react-icons/bi";
import { TbUserCircle } from "react-icons/tb";

interface Props {
  roleLect?: boolean;
}

const RegisterForm = ({ roleLect = false }: Props) => {
  const {
    modalStore: { closeModal, openModal },
    userStore: { Loading, register },
    accountStore: { addUser, loadingSubmit },
  } = useStore();

  const [errorList, setErrorList] = useState();
  const [role, setRole] = useState();
  const [roleData, setRoleData] = useState<any[]>([
    { label: "บุคคลทั่วไป", value: 0 },
    { label: "นักศึกษา", value: 1 },
  ]);

  useEffect(() => {
    if (roleLect) setRoleData([...roleData, { label: "อาจารย์", value: 2 }]);
  }, []);

  const handleChange = (value: any) => {
    setRole(value);
  };

  const handleSubmit = async (values: any) => {
    if (roleLect) {
      addUser({ ...values, role })
        .then(closeModal)
        .catch((error) => {
          setErrorList(error);
          console.log(error);
        });
    } else
      await register({ ...values, role }).catch((error) => {
        setErrorList(error);
        console.log(error);
      });
  };

  return (
    <Form className="login-form" initialValues={{}} onFinish={handleSubmit}>
      {role === UserRole.student && (
        <Form.Item
          name="username"
          rules={[{ required: true, message: "กรุณากรอกข้อมูล!" }]}
        >
          <Input
            prefix={<TbUserCircle className="site-form-item-icon" />}
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
          prefix={<BiVoicemail className="site-form-item-icon" />}
          placeholder="อีเมล"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "กรุณากรอกข้อมูล!" },
          { min: 6, message: "รหัสผ่านอย่างน้อย 6 อักษร" },
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
        options={roleData}
        value={role}
        defaultValue={"บุคคลทั่วไป"}
      />

      <Form.Item>
        <Text type="danger">
          {errorList &&
            Array.from(errorList).map((el: any, i: any) => <p key={i}>{el}</p>)}
        </Text>
        <Space>
          <Button
            loading={Loading || loadingSubmit}
            type="primary"
            htmlType="submit"
          >
            ลงทะเบียน
          </Button>

          {!roleLect && (
            <Button
              type="default"
              htmlType="button"
              onClick={() => openModal(<LoginForm />, "เข้าสู่ระบบ")}
            >
              เข้าสู่ระบบ
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default observer(RegisterForm);
