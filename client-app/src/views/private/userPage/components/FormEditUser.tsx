import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { BiLockAlt, BiPaperclip, BiUser } from "react-icons/bi";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../store/store";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const FormEditUser = ({ username, roleCurrent }: any) => {
  const {
    accountStore: { loadingSubmit, editUser },
    modalStore: { closeModal },
  } = useStore();
  const [isTouch, setIsTouch] = useState(false);

  const [form] = useForm();
  const handleSubmit = (values: any) => {
    confirm({
      centered: true,
      title: "ยืนยัน",
      icon: <ExclamationCircleFilled />,
      content: "ข้อมูลของผู้ใช้จะถูกแก้ไข",
      onOk: () => {
        let body: any = { currentUsername: username };
        Object.entries(values).forEach(([key, val]) => {
          if (val) body[key] = val;
        });
        editUser(body).then(async () => { 
          message.success("สำเร็จ");
          closeModal();
        });
      },
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        email: "",
        username: "",
        password: "",
        role: roleCurrent,
      }}
      onFinish={handleSubmit}
      onFieldsChange={() => setIsTouch(true)}
    >
      <Form.Item label="ชื่อผู้ใช้ หรือ รหัสนักศึกษา" name="username">
        <Input prefix={<BiUser />} />
      </Form.Item>

      <Form.Item
        label="อีเมล"
        name="email"
        rules={[{ type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" }]}
      >
        <Input prefix={<BiPaperclip />} />
      </Form.Item>

      <Form.Item
        label="รหัสผ่าน"
        name="password"
        rules={[{ min: 6, message: "อย่างน้อย 6 ตัวอักษร" }]}
      >
        <Input prefix={<BiLockAlt />} type="password" />
      </Form.Item>

      <Form.Item label="สถานะ" name="role">
        <Select>
          <Select.Option value={0}>ทั่วไป</Select.Option>
          <Select.Option value={1}>นักศึกษา</Select.Option>
          <Select.Option value={2}>อาจารย์</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          disabled={!isTouch}
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

export default observer(FormEditUser);
