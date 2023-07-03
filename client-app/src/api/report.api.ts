import { req } from "./agent";
import { DashboardModel, JobHistoryByName } from "../models/Report";

export const ReportAPI = {
  dashboard: () => req.get<DashboardModel>("report/dashboard"),
  jobByJobName: () => req.get<JobHistoryByName[]>("report/jobHistoryByJobName"),
  jobNameList: () => req.get<string[]>("common/jobNameList"),
  userCountByRole: () => req.get("report/userCountByRole"),
};
