import { LoginDTO, registerDTO, UpdateMe, User } from "../models/User";
import { req, multipleDataOption } from "./agent";

export const Accounts = {
  getCurrent: () => req.get<User>("/account"),
  login: (data: LoginDTO) => req.post<User>("/account/login", data),
  register: (data: registerDTO) => req.post<User>("/account/register", data),
  updateMe: (data: UpdateMe) => req.put("/account", data),
  hidden: () => req.put("/account/hidden", {}),
};
