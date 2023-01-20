import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

interface Props {
  message?: string;
}

const Loading = ({ message }: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen opacity-75 flex flex-col items-center justify-center">
      <Spin className="visually-hidden" indicator={antIcon} />
      {message}
    </div>
  );
};

export default Loading;
