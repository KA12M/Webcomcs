import React from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

const Index = () => {
  return (
    <>
      <Navbar />

      <div className="space-top" />

      <Outlet />

      <Footer />
    </>
  );
};

export default observer(Index);
