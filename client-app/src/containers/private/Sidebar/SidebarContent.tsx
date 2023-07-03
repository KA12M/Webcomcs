import React from "react"; 
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import SidebarItems from "./SidebarItems";
import { useStore } from "../../../store/store";
import { RoutePath } from "../../../constants/RoutePath";

function SidebarContent() {
  const {
    settingStore: { setting },
  } = useStore();

  return (
    <div className="py-4 text-gray-500 ">
      <Link
        className="ml-6 text-lg font-bold text-gray-800 "
        to={RoutePath.home}
      >
        {setting?.webName}
      </Link>
      <ul className="mt-6">
        <SidebarItems />
      </ul>
    </div>
  );
}

export default observer(SidebarContent);
