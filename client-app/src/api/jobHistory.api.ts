import { req } from "./agent";
import { JobHistory } from "../models/JobHistory";
import { PaginatedResult } from "../models/Pagination";

export const JobHistories = {
  list: (params: URLSearchParams) =>
    req.get<PaginatedResult<JobHistory[]>>(`/jobHistory`, { params }),
  updateJobHistory: (data: JobHistory) => req.put(`/jobHistory`, data),
  isUse: (username: string) => req.post(`/jobHistory/${username}`),
  meRemove: () => req.delete(`/jobHistory`),
};
