import { makeAutoObservable, reaction, runInAction } from "mobx";
import { config } from "../constants/config";
import agent from "../api/agent";

export default class CommonStore {
  token: string | null = window.localStorage.getItem("jwt");
  appLoaded: boolean = false;
  json: any = {};

  jobNameList: string[] = [];

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) window.localStorage.setItem("jwt", token);
        else window.localStorage.removeItem("jwt");
      }
    );
  }

  loadDefaultJson = () => {
    var url = (config.baseURL ?? "/") + "json/default.json";
    fetch(url)
      .then((res) => res.json())
      .then((data) => (this.json = data))
      .catch(() => {
        console.log(url);
        alert("data default not ready.");
      });
  };

  loadJobNameList = async () => {
    try {
      var response = await agent.ReportAPI.jobNameList();
      runInAction(() => {
        this.jobNameList = response;
      });
    } catch (error) {
      throw error;
    }
  };

  setToken = (token: string | null) => {
    if (token) window.localStorage.setItem("jwt", token);
    this.token = token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
