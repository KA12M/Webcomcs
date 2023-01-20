import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { observer } from "mobx-react-lite";
import { IoMenu } from "react-icons/io5";

import NavbarContent from "./NavbarContent";
import { useStore } from "../../../store/store";

const Navbar = () => {
  const {
    settingStore: { setting },
  } = useStore();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav className="menu--bar">
      <div className="menu--container">
        <div className="menu--left">
          <img
            src={setting?.logoPreview || "/image/kru.png"}
            className="navbar-logo"
          />
          <span className="text">
            <a href="/">วิทยาการคอมพิวเตอร์</a>
          </span>
        </div>
        <div className="rightMenu">
          <NavbarContent closeDrawer={onClose} />
        </div>

        <div className="barsMenu">
          <Button className="items-center" onClick={showDrawer}>
            <IoMenu size={16} />
          </Button>
        </div>

        <Drawer
          title="วิทยาการคอมพิวเตอร์"
          placement="right"
          closable={false}
          onClose={onClose}
          open={open}
          width="80%"
        >
          <NavbarContent closeDrawer={onClose} />
        </Drawer>
      </div>
    </nav>
  );
};

export default observer(Navbar);
