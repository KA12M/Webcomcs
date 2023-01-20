import { Setting } from "../models/Setting";
import { req, multipleDataOption } from "./agent";

export const SystemSettings = {
  get: () => req.get<Setting>("/systemSetting"),
  editSetting: (data: Setting) => {
    let formData = new FormData();
    formData.append("kruUrl", data.kruUrl);
    formData.append("registerUrl", data.registerUrl);
    if (data.fileImages) formData.append("FileImages", data.fileImages);
    req.put("/systemSetting", formData, multipleDataOption);
  },
};
