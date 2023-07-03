import {
  ChangePasswordDTO,
  LoginDTO,
  registerDTO,
  UpdateMe,
  User,
} from "../models/User";
import { req } from "./agent";

export const Accounts = {
  getCurrent: () => req.get<User>("/account"),
  login: (data: LoginDTO) => req.post<User>("/account/login", data),
  register: (data: registerDTO) => req.post<User>("/account/register", data),
  updateMe: (data: UpdateMe) =>
    req.put("/account", buildFormAccountUpdate(data)),
  hidden: () => req.put("/account/hidden", {}),
  changePassword: (data: ChangePasswordDTO) =>
    req.post("/account/resetPassword", data),
  editUser: (data: any) => req.put(`/account/editUser`, data),
};

const buildFormAccountUpdate = (data: UpdateMe) => {
  var formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if ((key === "student" || key === "lecturer") && value) {
      Object.entries(data[key]!).forEach(([key1, value1]) =>
        formData.append(`Account[${key}][${key1}]`, value1)
      );
    } else if (key == "fileImages")
      formData.append(`Account.FileImages`, value);
    else formData.append(`Account[${key}]`, value);
  });
  return formData;
};
