import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import MyHeader from "./Header";
import { useStore } from "../../store/store";
import Main from "../Main";
import SideBar from "./Sidebar/SideBar";
import ModalContainer from "../../components/ModalContainer";

const Index: React.FC = () => {
  const {
    sideBarStore: { isSidebarOpen, closeSidebar },
    homePhotoStore: { GetPhotos },
  } = useStore();
  let location = useLoaderData();

  useEffect(() => {
    GetPhotos(false);
    closeSidebar();
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen ? "overflow-hidden" : ""
      }`}
    >
      <SideBar />

      <div className="flex flex-col flex-1 w-full">
        <MyHeader />

        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
};

export default observer(Index);
