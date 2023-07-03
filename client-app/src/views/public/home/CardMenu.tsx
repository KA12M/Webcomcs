import React from "react";
import { Col, Space } from "antd";
import { Link } from "react-router-dom"; 
import { TbHandClick } from "react-icons/tb";

const CardMenu = ({ title, image, url }: any) => {
  return (
    <Col xs={24} md={8} lg={6} className="w-full relative overflow-clip">
      <img
        src={image}
        className="rounded-xl shadow-md brightness-75 w-full h-full object-cover"
      />
      <Link
        to={url}
        className="bg-white absolute rounded-full px-4 pt-2 text-md lg:text-lg bottom-4 text-indigo-600 font-bold translate-x-3 shadow-lg"
      >
        <Space>
          <TbHandClick size={24} />
          {title}
        </Space>
      </Link>
    </Col>
  );
};

export default CardMenu;
