import { Profile } from "../models/User";
import { req } from "./agent";
import { PaginatedResult } from '../models/Pagination';

export const Profiles = {
  list: (params: URLSearchParams) => req.get<PaginatedResult<Profile[]>>("/profile", { params }),
};
