import { makeAutoObservable } from "mobx";

export default class SideBarStore {
  isSidebarOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSidebar = () => (this.isSidebarOpen = !this.isSidebarOpen);

  closeSidebar = () => (this.isSidebarOpen = false);
}
