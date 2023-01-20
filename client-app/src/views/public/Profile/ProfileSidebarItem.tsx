import React from "react";
import { Menu, MenuProps } from "antd";
import { router } from "../../../routes/Routes";
import { BiCog, BiUser } from "react-icons/bi";

const ProfileSidebarItem = () => {
  const items: MenuProps["items"] = [
    {
      key: "grp",
      label: "บัญชี",
      type: "group",
      children: [
        {
          key: "user",
          label: "ข้อมูลผู้ใช้",
          icon: <BiUser size={18} />,
          onClick: () => router.navigate("/profile"),
        },
        {
          key: "settings",
          label: "ตั้งค่า",
          icon: <BiCog size={18} />,
          onClick: () => router.navigate("/profile/course"),
        },
      ],
    },
  ];
  return <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />;
};

export default ProfileSidebarItem;
