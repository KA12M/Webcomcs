import React from "react";
import ReactDOM from "react-dom/client";

import "./main.css";

import { store, StoreContext } from "./store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";

import ModalContainer from "./components/ModalContainer";
import ConfigProvider from "antd/es/config-provider";
import th_TH from "antd/locale/th_TH";

import { Font } from "@react-pdf/renderer";
import { config } from "./constants/config";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Font.register({
  family: "Kanit",
  src: config.baseURL + "/fonts/Kanit-Light.ttf",
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ConfigProvider locale={th_TH}>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />

      <ModalContainer />
    </StoreContext.Provider>
  </ConfigProvider>
);
