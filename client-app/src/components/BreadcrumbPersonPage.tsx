import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { RoutePath } from "../constants/RoutePath";
import BreadcrumbPublic from "./BreadcrumbPublic";

const routeName = {
  [RoutePath.students]: "นักศึกษา",
  [RoutePath.lecturers]: "อาจารย์ประจำสาขาวิทยาการคอมพิวเตอร์",
  [RoutePath.studentJobHistory]: "ประวัติการทำงานของนักศึกษา",
};

const BreadcrumbPersonPage = () => {
  const { pathname } = useLocation();

  const menuItems: any = [
    {
      key: "1",
      label: (
        <Link
          to={RoutePath.students}
          children={routeName[RoutePath.students]}
        />
      ),
    },
    {
      key: "2",
      label: (
        <Link
          to={RoutePath.lecturers}
          children={routeName[RoutePath.lecturers]}
        />
      ),
    },
    {
      key: "3",
      label: (
        <Link
          to={RoutePath.studentJobHistory}
          children={routeName[RoutePath.studentJobHistory]}
        />
      ),
    },
  ];

  return (
    <BreadcrumbPublic
      text=""
      textDefault={false}
      links={
        <Breadcrumb.Item menu={{ items: menuItems }}>
          <span className="cursor-pointer">{routeName[pathname]}</span>
        </Breadcrumb.Item>
      }
    />
  );
};

export default BreadcrumbPersonPage;
