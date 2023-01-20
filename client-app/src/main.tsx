import React from "react";
import ReactDOM from "react-dom/client"; 

import { store, StoreContext } from "./store/store"; 
import "./main.css"; 
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import ModalContainer from "./components/ModalContainer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);   

root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />

    <ModalContainer />
  </StoreContext.Provider>
);
