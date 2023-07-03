import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/es/form/Form";
import { BiLockAlt } from "react-icons/bi";
import { Form, Input, Button, message } from "antd";

import { useStore } from "../../../../store/store";
import { ChangePasswordDTO } from "../../../../models/User";

class formModel implements ChangePasswordDTO {
  currentPassword: string = "";
  newPasswords: string = "";
}

const FormResetPassword = () => {
  const [form] = useForm();

  const {
    userStore: { loadingSubmit, resetPassword },
  } = useStore();

  const handleSubmit = (values: any) => {
    resetPassword(values).then(() => {
      message.success("สำเร็จ");
      form.resetFields();
    });
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={new formModel()}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="รหัสผ่านปัจจุบัน"
        name="currentPassword"
        rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
      >
        <Input prefix={<BiLockAlt />} type="password" />
      </Form.Item>

      <Form.Item
        label="รหัสผ่านใหม่"
        name="newPassword"
        rules={[
          { required: true, message: "กรุณากรอกข้อมูล!" },
          { min: 6, message: "อย่างน้อย 6 ตัวอักษร" },
        ]}
      >
        <Input prefix={<BiLockAlt />} type="password" />
      </Form.Item>

      <Form.Item>
        <Button
          loading={loadingSubmit}
          shape="round"
          type="primary"
          htmlType="submit"
        >
          บันทึก
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(FormResetPassword);
