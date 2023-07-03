import { makeAutoObservable, runInAction } from "mobx";
import {
  ComSciSubject as subjectModel,
  ComSciSubjectDetail,
  ComSciSubjectUpdate,
} from "../models/ComSciSubject";
import agent from "../api/agent";
import { ComSciSubjectCreate } from "../models/ComSciSubject";
import URLImage from "../utils/URL";

export default class ComSciSubject {
  comsciSubjectRegistry = new Map<string, subjectModel>();
  subjectSelected: ComSciSubjectDetail | null = null;
  tableBody: any[] = [];

  loading = false;
  submitLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTableBody = (temp: any[]) => (this.tableBody = temp);
  setSubject = (data: subjectModel) => {
    data.iconPreview = data.icon && URLImage(data.icon);
    this.comsciSubjectRegistry.set(data.id!, data);
  };
  clearSelect = () => (this.subjectSelected = null);

  loadSubjects = async () => {
    this.loading = true;
    try {
      var response = await agent.ComSciSubjects.list();
      runInAction(() => {
        response.forEach(this.setSubject);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  loadSubject = async (id: string) => {
    this.loading = true;
    try {
      var response = await agent.ComSciSubjects.detail(id);
      return runInAction(() => {  
        response.iconPreview = response.icon && URLImage(response.icon);
        response.photos = response.photos.map((photo) => ({
          ...photo,
          imagePreview: URLImage(photo.url),
        }));
        this.subjectSelected = response;
        this.loading = false;
        return response;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  createSubject = async (data: ComSciSubjectCreate) => {
    this.submitLoading = true;
    try {
      var response = await agent.ComSciSubjects.create(data);
      runInAction(() => {
        this.setSubject(Object.assign(response));
        this.submitLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submitLoading = false));
      throw error;
    }
  };

  updateSubject = async (data: ComSciSubjectUpdate) => {
    this.submitLoading = true;
    try {
      var response = await agent.ComSciSubjects.update(data);
      runInAction(() => {
        this.setSubject(Object.assign(response));
        this.submitLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submitLoading = false));
      throw error;
    }
  };

  removeSubject = async (id: string) => {
    this.loading = true;
    try {
      await agent.ComSciSubjects.delete(id);
      runInAction(() => {
        this.comsciSubjectRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };
}
