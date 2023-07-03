import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Outlet, useLoaderData } from "react-router-dom";

import Main from "../Main";
import SideBar from "./Sidebar/SideBar";
import MyHeader from "./Header";
import { useStore } from "../../store/store";

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
      className={`flex bg-gray-50 ${isSidebarOpen ? "overflow-hidden" : ""}`}
    >
      <SideBar />

      <div className="flex flex-col flex-1 w-full">
        <MyHeader />

        <Main className="pb-8">
          <Outlet />
        </Main>
      </div>
    </div>
  );
};

export default observer(Index);
