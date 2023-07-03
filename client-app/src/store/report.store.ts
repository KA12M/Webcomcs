import { makeAutoObservable, runInAction } from "mobx";
import { DashboardModel, JobHistoryByName } from "../models/Report";
import agent from "../api/agent";

export class ReportStore {
  dashboardData: DashboardModel | null = null;
  jobByJobName: JobHistoryByName[] = [];
  userCountByRole: any[] = [];

  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadDashboard = async () => {
    this.loading = true;
    try {
      var response = await agent.ReportAPI.dashboard();
      runInAction(() => {
        this.dashboardData = response;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  loadJobHistoryByJobName = async () => {
    this.loading = true;
    try {
      var response = await agent.ReportAPI.jobByJobName();
      runInAction(() => {
        this.jobByJobName = response;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  loadUserCountByRole = async () => {
    this.loading = true;
    try {
      var response = (await agent.ReportAPI.userCountByRole()) as any[];
      runInAction(() => {
        this.userCountByRole = response;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };
}
