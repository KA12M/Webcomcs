import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../store/store";
import MenuComponent from "./MenuComponent";
import LoginForm from "../../../views/public/LoginForm";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { router } from "../../../routes/Routes";

const NavbarContent = ({ closeDrawer }: any) => {
  const {
    modalStore: { openModal },
    userStore: { user, logout },
  } = useStore();

  const items: MenuProps["items"] = [
    {
      key: "me",
      label: "บัญชี",
      onClick: () => router.navigate("/profile"),
    },
    user && user!.roles && user!.roles!.some((a) => a == "Admin")
      ? {
          key: "3",
          label: "แอดมิน",
          onClick: () => router.navigate("/secret"),
        }
      : null,
    {
      key: "logout",
      danger: true,
      label: "ออกจากระบบ",
      onClick: logout,
    },
  ];

  return (
    <div className="items-center justify-between w-full md:flex md:w-auto md:order-1">
      <ul className="navbar">
        <MenuComponent label="หน้าหลัก" route="/" />
        <MenuComponent label="หลักสูตรวิทยาการคอมพิวเตอร์" route="/" />
        <MenuComponent label="โครงการงานวิจัย" route="/" />
        <MenuComponent label="หลักสูตรอบรมระยะสั้น" route="/" />
        {user ? (
          <MenuComponent
            children={
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar icon={user.image && <img src={user.image!} />}>
                      {user.fullName[0].toUpperCase()}
                      {user.fullName.split(" ").length > 1 &&
                        user.fullName.split(" ")[1][0]}
                    </Avatar>
                    {user.fullName.split(" ")[0]}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            }
          />
        ) : (
          <MenuComponent
            label="สมาชิก"
            onClick={() => {
              closeDrawer();
              openModal(<LoginForm />, "เข้าสู่ระบบ");
            }}
          />
        )}
      </ul>
    </div>
  );
};

export default observer(NavbarContent);
