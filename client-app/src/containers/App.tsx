import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

import { useStore } from "../store/store";
import Loading from "./Loading";
import ScrollToTop from "../utils/ScrollToTop";
import { notification } from "antd";

const App = () => {
  const {
    commonStore,
    userStore,
    homePhotoStore,
    settingStore,
    comSciSubject,
  } = useStore();

  useEffect(() => {
    homePhotoStore.GetPhotos(true);
  }, []);

  useEffect(() => {
    commonStore.loadDefaultJson();
    comSciSubject.loadSubjects();
    if (commonStore.token) {
      settingStore.loadSetting();
      userStore.getUser().finally(commonStore.setAppLoaded);
    } else {
      settingStore.loadSetting().finally(commonStore.setAppLoaded);
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <Loading message="กำลังดาวน์โหลด..." />;

  return (
    <>
      <ScrollToTop />

      <>
        <Outlet />
      </>
    </>
  );
};

export default observer(App);
