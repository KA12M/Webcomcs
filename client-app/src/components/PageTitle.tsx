import React from "react";
import { Breadcrumb } from "antd";
import { RouteSecret } from "../constants/RoutePath";
import { Link } from "react-router-dom";

interface Path {
  label: string;
  route?: string;
}

interface Props {
  path?: Path[];
  text: string;
  tail?: string;
  children?: any;
}

function PageTitle({ path = [], text, tail, children }: Props) {
  return (
    <>
      <Breadcrumb className="mt-6">
        <Breadcrumb.Item>
          <Link to={RouteSecret.home}>หน้าหลัก</Link>
        </Breadcrumb.Item>
        {path.map((a, i) => (
          <Breadcrumb.Item key={i}>
            <Link to={a.route!}>{a.label}</Link>
          </Breadcrumb.Item>
        ))}
        <Breadcrumb.Item>{text}</Breadcrumb.Item>
        {tail && <Breadcrumb.Item>{tail}</Breadcrumb.Item>}
      </Breadcrumb>

      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {text}
      </h1>
    </>
  );
}

export default PageTitle;
