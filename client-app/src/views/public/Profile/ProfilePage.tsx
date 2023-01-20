import React from "react";
import Main from "../../../containers/Main";
import ProfileSidebar from "./ProfileSidebar";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="bg-red-500 rounded-lg flex h-screen mx-auto container">
      <ProfileSidebar />

      <div className="flex flex-col flex-1 w-full py-2">
        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
};

export default ProfilePage;
