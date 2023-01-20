import React, { useContext, useState } from "react";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";

import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { router } from "../../routes/Routes";

function MyHeader() {
  const {
    sideBarStore: { toggleSidebar },
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
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto  dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuOutlined className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32"></div>

        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Profile menu --> */}
          <Dropdown menu={{ items }} className="cursor-pointer">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar icon={user!.image && <img src={user!.image!} />}>
                  {user!.fullName[0].toUpperCase()}
                  {user!.fullName.split(" ").length > 1 &&
                    user!.fullName.split(" ")[1][0]}
                </Avatar>
                {user!.fullName.split(" ")[0]}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </ul>
      </div>
    </header>
  );
}

export default observer(MyHeader);
