import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { JobHistory } from "./../models/JobHistory";
import { store } from "./store";
import { Pagination, PagingParams } from "../models/Pagination";
import URLImage from "../utils/URL";

export default class JobHistoryStore {
  jobHistoryRegistry = new Map<string, JobHistory>();
  tableBody: any[] = [];
  predicate = new Map<string, any>().set("showAll", false);

  pagination: Pagination | null = null;
  pagingParams: PagingParams = new PagingParams(1, 8);

  submittingLoading: boolean = false;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPagination = (pagination: Pagination) => (this.pagination = pagination);
  setPagingParams = (page: number, pageSize: number) => {
    this.pagingParams = { currentPage: page, pageSize };
    this.setPagination({
      ...this.pagination!,
      currentPage: page,
    });
  };
  setJobHistory = (jobHistory: JobHistory) => {
    jobHistory.user!.image =
      jobHistory.user!.image && URLImage(jobHistory.user!.image);
    this.jobHistoryRegistry.set(jobHistory.user?.username!, jobHistory);
  };
  setTable = (temp: any) => (this.tableBody = temp);

  get axiosParams() {
    let params = new URLSearchParams();
    params.append("currentPage", this.pagingParams.currentPage.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  loadJobHistories = async () => {
    this.loading = true;
    try {
      let res = await agent.JobHistories.list(this.axiosParams);
      runInAction(() => {
        res.data.forEach(this.setJobHistory);
        this.setPagination(res.pagination);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  updateJobHistory = async (data: JobHistory) => {
    this.submittingLoading = true;
    try {
      await agent.JobHistories.updateJobHistory(data);
      runInAction(() => {
        var userCurrent = store.userStore.profile;
        store.userStore.profile = Object.assign(userCurrent!, {
          jobHistory: data,
        });
        this.submittingLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submittingLoading = false));
      throw error;
    }
  };

  changeIsUse = async (username: string) => {
    this.loading = true;
    try {
      await agent.JobHistories.isUse(username);
      runInAction(() => {
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  meRemoveJobHistory = async () => {
    this.loading = true;
    try {
      await agent.JobHistories.meRemove();
      runInAction(() => {
        store.userStore.profile!.jobHistory = null;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };
}
