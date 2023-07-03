import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { observer } from "mobx-react-lite";
import { IoMenu } from "react-icons/io5";

import NavbarContent from "./NavbarContent";
import { useStore } from "../../../store/store";
import { Link, useLocation } from "react-router-dom";
import { RoutePath } from "../../../constants/RoutePath";

const Navbar = () => {
  const { pathname } = useLocation();
  const {
    settingStore: { setting },
  } = useStore();

  useEffect(() => {
    onClose();
  }, [pathname]);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav className="menu--bar" id="public-navbar">
      <div className="menu--container">
        <div className="menu--left">
          <img
            src={setting?.logoPreview || "/image/kru.png"}
            className="navbar-logo"
          />
          <Link to={RoutePath.home} className="text">
            <span className="font-bold">{setting?.webName}</span>
            <span className="block text-gray-500 text-base">
              มหาวิทยาลัยราชภัฏกาญจนบุรี
            </span>
          </Link>
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
          title={setting?.webName}
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
