import { Menu, MenuProps } from "antd";
import {
  BiHome,
  BiGridAlt,
  BiUser,
  BiCog,
  BiImages,
  BiNews,
} from "react-icons/bi";

import { router } from "../../../routes/Routes";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  onClick?: () => void | null,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  {
    key: "dashboard",
    label: "หลัก",
    icon: <BiHome size={18} />,
    onClick: () => router.navigate("/secret"),
  },
  {
    key: "general",
    label: "ทั่วไป",
    icon: <BiGridAlt size={18} />,
    children: [
      {
        key: "home-photo",
        label: "รูปภาพนห้าเว็บ",
        icon: <BiImages size={18} />,
        onClick: () => router.navigate("/secret/home-photo"),
      },
      {
        key: "news-dashboard",
        label: "ข่าวประชาสัมพันธ์",
        icon: <BiNews size={18} />,
        onClick: () => router.navigate("/secret/news-manage"),
      },
    ],
  },

  {
    key: "grp",
    label: "ระบบ",
    type: "group",
    children: [
      {
        key: "user",
        label: "ผู้ใช้ในระบบ",
        icon: <BiUser size={18} />,
        onClick: () => router.navigate("/secret/user"),
      },
      {
        key: "settings",
        label: "ตั้งค่าระบบ",
        icon: <BiCog size={18} />,
        onClick: () => router.navigate("/secret/settings"),
      },
    ],
  },
];

const SidebarItems: React.FC = () => {
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default SidebarItems;
