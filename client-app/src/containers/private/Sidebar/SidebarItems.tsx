import { Menu, MenuProps } from "antd";
import {
  BiHome,
  BiUser,
  BiCog,
  BiImages,
  BiNews,
  BiFolderOpen,
  BiUserPin,
  BiBook,
  BiBarChartSquare,
} from "react-icons/bi";
import { TbCodeDots } from "react-icons/tb";

import { router } from "../../../routes/Routes";
import { RouteSecret } from "../../../constants/RoutePath";

const items: MenuProps["items"] = [
  {
    key: "dashboard",
    label: "หลัก",
    icon: <BiHome size={18} />,
    onClick: () => router.navigate(RouteSecret.home),
  },
  {
    key: "user",
    label: "ผู้ใช้ในระบบ",
    icon: <BiUser size={18} />,
    onClick: () => router.navigate(RouteSecret.userManage),
  },
  {
    key: "job-history",
    label: "ประวัติการทำงาน",
    icon: <BiBarChartSquare size={18} />,
    onClick: () => router.navigate(RouteSecret.jobHistoryManage),
  },
  {
    key: "student-project-management",
    label: "โครงงานนักศึกษา",
    icon: <BiFolderOpen size={18} />,
    onClick: () => router.navigate(RouteSecret.projectManage),
  },
  {
    key: "news-dashboard",
    label: "ข่าวประชาสัมพันธ์",
    icon: <BiNews size={18} />,
    onClick: () => router.navigate(RouteSecret.newsManage),
  },
  {
    key: "syllabus-management",
    label: "หลักสูตร",
    icon: <BiBook size={18} />,
    onClick: () => router.navigate(RouteSecret.syllabusManage),
  },
  {
    key: "grp",
    label: "ระบบ",
    type: "group",
    children: [
      {
        key: "home-photo",
        label: "รูปภาพนหน้าเว็บ",
        icon: <BiImages size={18} />,
        onClick: () => router.navigate(RouteSecret.homePhotoManage),
      },
      {
        key: "comsci-subject",
        label: "สิ่งที่เรียน",
        icon: <TbCodeDots />,
        onClick: () => router.navigate(RouteSecret.comsciSubjectManage),
      },
      {
        key: "lecturer-system",
        label: "อาจารย์",
        icon: <BiUserPin size={18} />,
        onClick: () => router.navigate(RouteSecret.lecturerMange),
      },
      {
        key: "settings",
        label: "ตั้งค่าระบบ",
        icon: <BiCog size={18} />,
        onClick: () => router.navigate(RouteSecret.settingMange),
      },
    ],
  },
];

const SidebarItems: React.FC = () => {
  return <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />;
};

export default SidebarItems;
