import { Profile } from "../models/User";
import { req } from "./agent";
import { PaginatedResult } from "../models/Pagination";

export const Profiles = {
  list: (params: URLSearchParams) =>
    req.get<PaginatedResult<Profile[]>>("/profile", { params }),
  profile: (username: string) => req.get<Profile>(`/profile/${username}`),
  deleteAccount: (username: string) => req.delete(`/profile/${username}`),
};
