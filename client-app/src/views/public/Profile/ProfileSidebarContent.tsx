import React from "react";
import { Button } from "@windmill/react-ui";
import ProfileSidebarItem from "./ProfileSidebarItem";

const ProfileSidebarContent = () => {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400 ">
      <ul className="mt-2">
        <ProfileSidebarItem />
      </ul>
      <div className="px-6 my-6">
        <Button>
          วิทยาการคอมพิวเตอร์
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileSidebarContent;
