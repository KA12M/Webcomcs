import { Setting } from "../models/Setting";
import { req, multipleDataOption } from "./agent";

export const SystemSettings = {
  get: () => req.get<Setting>("/systemSetting"),
  editSetting: (data: Setting) =>
    req.putForm("/systemSetting", buildFormDataSetting(data)),
};

const buildFormDataSetting = (data: Setting) => {
  var formData = new FormData();
  Object.entries(data).forEach(([key, val]) => {
    if (val) formData.append(key, val);
  });
  return formData;
};
