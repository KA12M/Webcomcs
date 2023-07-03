import { makeAutoObservable, runInAction } from "mobx";
import { Setting } from "../models/Setting";
import agent from "../api/agent";
import URLImage from "../utils/URL";

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
        result.youtubeList = result.videoUrl
          ? Array.from(result.videoUrl!.split(","))
          : [];
        result.latAndLng = {
          lat: result.location.split(",")[0],
          lng: result.location.split(",")[1],
        };
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
    setting.videoUrl =
      setting.youtubeList!.length > 0 ? setting.youtubeList!.join() : "";
    setting.location = `${setting.latAndLng.lat},${setting.latAndLng.lng}`;
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

  changeSetting = (obj: {}) =>
    (this.setting = Object.assign(this.setting!, obj));
}
