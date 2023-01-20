import { makeAutoObservable, runInAction } from "mobx";
import { Setting } from "../models/Setting";
import agent from "../api/agent";
import URLImage from "../utils/URLImage";

export class settingStore {
  setting: Setting | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadSetting = async () => {
    this.loading = true;
    try {
      const result = await agent.SystemSettings.get();
      runInAction(() => {
        result.logoPreview = result.logo! && URLImage(result.logo);
        this.setting = result;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  updateSetting = async (setting: Setting) => {
    this.loading = true;
    try {
      await agent.SystemSettings.editSetting(setting);
      runInAction(() => {
        this.loading = false;
        this.setting = setting;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  changeSetting = (setting: Setting) => (this.setting = setting);
}
