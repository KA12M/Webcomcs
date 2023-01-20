import { Breadcrumb } from "antd";
import React from "react";
import { router } from "../routes/Routes";

interface Path {
  label: string;
  route?: string;
}

interface Props {
  homePath?: string;
  path?: Path[];
  text: string;
  children?: any;
}

function PageTitle({ homePath = "/", path = [], text, children }: Props) {
  return (
    <>
      <Breadcrumb className="mt-6">
        <Breadcrumb.Item onClick={() => router.navigate(homePath)}>
          <a href="#">หน้าหลัก</a>
        </Breadcrumb.Item>
        {path.map((a, i) => (
          <Breadcrumb.Item key={i} onClick={() => a.route ?? router.navigate(a.route!)}>
            <a href="#">{a.label}</a>
          </Breadcrumb.Item>
        ))}
        <Breadcrumb.Item>{text}</Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {text}
      </h1>
    </>
  );
}

export default PageTitle;
