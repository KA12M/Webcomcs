import React from "react";
import Desktop from "./Desktop";
import MobileSidebar from "./MobileSidebar";
import SidebarContent from "./SidebarContent"; 

const SideBar = () => {
  return (
    <>
      <Desktop>
        <SidebarContent />
      </Desktop>
      
      <MobileSidebar>
        <SidebarContent />
      </MobileSidebar>
    </>
  );
};

export default SideBar;
