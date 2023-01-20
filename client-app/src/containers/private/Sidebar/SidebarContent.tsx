import React from "react"; 
import { Button } from "@windmill/react-ui"; 

import { observer } from 'mobx-react-lite';
import SidebarItems from "./SidebarItems";

function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a
        className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        href="/"
      >
        วิทยาการคอมพิวเตอร์
      </a>
      <ul className="mt-6">
        <SidebarItems />
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
}

export default observer(SidebarContent);
