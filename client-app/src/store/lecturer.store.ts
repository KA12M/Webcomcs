import { makeAutoObservable, runInAction } from "mobx";

import { Lecturer, LecturerCreate, LecturerUpdate } from "../models/Lecturer";
import agent from "../api/agent";
import URLImage from "../utils/URL";
import { message } from "antd"; 
import { store } from "./store";

export class LecturerStore {
  lecturerRegistry = new Map<string, Lecturer>();

  positionList: string[] = [];
  predicate = new Map<string, any>().set("showHidden", false).set("search", "");
  tableBody: any[] = [];

  loading: boolean = false;
  submitLoading: boolean = false;

  constructor() { 
    makeAutoObservable(this);
  }

  setPredicate = (key: string, val: any) => (this.predicate.set(key, val))
  setTable = (temp: any) => (this.tableBody = temp);

  private get axiosParams() {
    const params = new URLSearchParams();
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  private setLecturer = (data: Lecturer) => {
    data.imagePreview = data.image! && URLImage(data.image);
    this.lecturerRegistry.set(data.id, data);
  };

  setPositionList = () =>
    (this.positionList = [
      ...new Set(this.lecturerList().map((a) => a.position)),
    ]);

  lecturerList = () => Array.from(this.lecturerRegistry.values());

  prefixList = () => [...new Set(this.lecturerList().map((a) => a.prefix))];

  get groupedLecturers() {
    const json: any = store.commonStore.json;
    const groupObj: any = this.lecturerList().reduce((acc: any, curr: any) => {
      if (!acc[curr.position]) acc[curr.position] = [];
      acc[curr.position].push(curr);
      return acc;
    }, {});

    let data: any = {};

    json["lecturer-order-position"].forEach((pos: any) => {
      if (groupObj[pos]) data[pos] = groupObj[pos];
    });

    for (let position in groupObj) {
      if (!json["lecturer-order-position"].includes(position))
        data[position] = groupObj[position];
    }
    return data;
  }

  loadLecturers = async () => {
    this.loading = true;
    try {
      this.lecturerRegistry.clear();
      let lecturers = await agent.Lecturers.list(this.axiosParams);
      runInAction(() => {
        lecturers.forEach(this.setLecturer);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  addLecturer = async (data: LecturerCreate) => {
    this.submitLoading = true;
    try {
      await agent.Lecturers.create(data);
      runInAction(() => (this.submitLoading = false));
    } catch (error) {
      runInAction(() => (this.submitLoading = false));
      throw error;
    }
  };

  editLecturer = async (data: LecturerUpdate) => {
    this.submitLoading = true;
    let currentLecturer = this.lecturerRegistry.get(data.id);
    if (!currentLecturer) return message.error("error", 2);
    try {
      await agent.Lecturers.edit(data);
      runInAction(() => {
        this.lecturerRegistry.set(data.id, Object.assign(currentLecturer!, {}));
        this.submitLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submitLoading = false));
      throw error;
    }
  };

  removeLecturer = async (id: string) => {
    this.loading = true;
    try {
      await agent.Lecturers.delete(id);
      runInAction(() => {
        this.lecturerRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  setHidden = async (id: string) => {
    try {
      await agent.Lecturers.hidden(id);
      runInAction(() => {
        let currentLecturer = this.lecturerRegistry.get(id);
        this.lecturerRegistry.set(
          id,
          Object.assign(currentLecturer!, { hidden: !currentLecturer!.hidden })
        );
      });
    } catch (error) {
      throw error;
    }
  };
}
