import React from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";  

const Index = () => {

  return (
    <div className="main-public">
         
      <Navbar />
 
      <Outlet />  
      
      <Footer />
    </div>
  );
};

export default observer(Index);
