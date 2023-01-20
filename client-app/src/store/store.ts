import { createContext, useContext } from "react";

import commonStore from "./common.store";
import modalStore from "./modal.store";
import accountStore from "./account.store";
import userStore from "./user.store";
import sideBarStore from "./sidebar.store";
import { homePhotoStore } from "./homephoto.store";
import { settingStore } from "./setting.store";
import newsStore from "./news.store";

interface Store {
  commonStore: commonStore;
  modalStore: modalStore;
  accountStore: accountStore;
  userStore: userStore;
  sideBarStore: sideBarStore;
  homePhotoStore: homePhotoStore;
  settingStore: settingStore;
  newsStore: newsStore;
}

export const store: Store = {
  commonStore: new commonStore(),
  modalStore: new modalStore(),
  accountStore: new accountStore(),
  userStore: new userStore(),
  sideBarStore: new sideBarStore(),
  homePhotoStore: new homePhotoStore(),
  settingStore: new settingStore(),
  newsStore: new newsStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
