import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "../store/store";
import Loading from "./Loading";
import { Outlet } from "react-router-dom";
import ScrollToTop from '../utils/ScrollToTop';

const App = () => {
  const { commonStore, userStore, homePhotoStore, settingStore } = useStore();

  useEffect(() => {
    homePhotoStore.GetPhotos(true);
  }, []);

  useEffect(() => {
    if (commonStore.token) {
      settingStore.loadSetting();
      userStore.getUser().finally(commonStore.setAppLoaded);
    } else {
      settingStore.loadSetting().finally(commonStore.setAppLoaded);
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <Loading message="Loading app..." />;

  return (
    <>
      <ScrollToTop />
      
      <Outlet />
    </>
  );
};

export default observer(App);
