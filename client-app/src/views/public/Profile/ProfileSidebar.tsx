import React from "react";
import Desktop from "../../../containers/private/Sidebar/Desktop";
import MobileSidebar from "../../../containers/private/Sidebar/MobileSidebar";
import ProfileSidebarContent from "./ProfileSidebarContent";

const ProfileSidebar = () => {
  return (
    <>
      <Desktop>
        <ProfileSidebarContent />
      </Desktop>

      <MobileSidebar>
        <ProfileSidebarContent />
      </MobileSidebar>
    </>
  );
};

export default ProfileSidebar;
