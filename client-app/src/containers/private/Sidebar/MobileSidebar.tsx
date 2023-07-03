import React, { useContext } from "react";

import { Transition, Backdrop } from "@windmill/react-ui";

import { useStore } from "../../../store/store";
import { observer } from "mobx-react-lite";

function MobileSidebar({ children }: any) {
  const {
    sideBarStore: { isSidebarOpen, closeSidebar },
  } = useStore();
 
  return (
    <Transition show={isSidebarOpen}>
      <>
        <Transition
          enter="transition ease-in-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Backdrop onClick={closeSidebar} />
        </Transition>

        <Transition
          enter="transition ease-in-out duration-150"
          enterFrom="opacity-0 transform -translate-x-20"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 transform -translate-x-20"
        >
          <aside className="fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white  lg:hidden">
            {children}
          </aside>
        </Transition>
      </>
    </Transition>
  );
}

export default observer(MobileSidebar);
