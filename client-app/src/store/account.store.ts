import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/User";
import URLImage from "../utils/URLImage";
import { PagingParams, Pagination } from "../models/Pagination";

export default class AccountStore {
  accountsRegistry = new Map<string, Profile>();
  tableBody: any[] = [];

  pagination: Pagination | null = null;
  pagingParams: PagingParams = new PagingParams(1, 10);
  predicate = new Map().set("role", "all");
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("currentPage", this.pagingParams.currentPage.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  setLoading = (state: boolean) => (this.loading = state);

  setRole = (role: string) => this.predicate.set("role", role);
  setSearch = (word: string) => this.predicate.set("search", word);
  setPagination = (pagination: Pagination) => (this.pagination = pagination);
  setPagingParams = (page: number, pageSize: number) => {
    this.pagingParams = { currentPage: page, pageSize };
    this.setPagination({
      ...this.pagination!,
      currentPage: page,
    });
  };

  setTable = (temp: any[]) => (this.tableBody = temp); 

  loadAccounts = async () => {
    this.setLoading(true);
    this.accountsRegistry.clear();
    try {
      var result = await agent.Profiles.list(this.axiosParams); 
      this.setPagination(result.pagination);
      runInAction(() => {
        result.data.forEach(this.setAccount);
      });
      this.setLoading(false);
    } catch (error) {
      runInAction(() => this.setLoading(false));
      throw error;
    }
  };

  private setAccount = (account: Profile) => {
    account.image = account.image && URLImage(account.image!);
    this.accountsRegistry.set(account.username, account);
  };

}
