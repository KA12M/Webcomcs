import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store";
import { useForm } from "antd/es/form/Form";
import { Form } from "antd";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const {
    commonStore: { json },
    userStore: { loadingSubmit, login },
  } = useStore();

  const [form] = useForm();

  const handleSubmit = (values: any) => {
    console.log(values);

    login(values);
  };

  return (
    <div className="min-h-screen flex items-center min-w-screen">
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{ email: "", password: "" }}
        className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto w-full lg:max-w-4xl"
      >
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              json["sign-in-photo"] ||
              "https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
            })`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            สาขาวิทยาการคอมพิวเตอร์
          </h2>
          <p className="text-xl text-gray-600 text-center">
            มหาวิทยาลัยราชภัฏกาญจนบุรี
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              อีเมล ชื่อผู้ใช้ หรือ รหัสนักศึกษา
            </label>
            <Form.Item name="email">
              <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" />
            </Form.Item>
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                รหัสผ่าน
              </label>
            </div>
            <Form.Item name="password">
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
              />
            </Form.Item>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              {loadingSubmit ? (
                <LoadingOutlined style={{ fontSize: 24 }} spin />
              ) : (
                "ลงทะเบียนเข้าสู่ระบบ"
              )}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link to="sign-up" className="text-xs text-gray-500 uppercase">
              สมัครสมาชิก
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default observer(LoginPage);
