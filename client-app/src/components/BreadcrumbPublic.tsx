import React from "react";
import { Breadcrumb, Space } from 'antd';
import { Link } from "react-router-dom";
import { RoutePath } from "../constants/RoutePath";
import { HomeOutlined } from '@ant-design/icons';

interface Props {
  text: string;
  textDefault?: boolean;
  links?: any;
}

const BreadcrumbPublic = ({ text, links, textDefault = true }: Props) => {
  return (
    <Breadcrumb className="my-8">
      <Breadcrumb.Item>
        <Link to={RoutePath.home}>
          <Space>
            <HomeOutlined />
            <span className="text-base">หน้าหลัก</span>
          </Space>
        </Link>
      </Breadcrumb.Item>

      {links}

      {textDefault && (
        <Breadcrumb.Item>
          <span className="text-base">{text}</span>
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default BreadcrumbPublic;
