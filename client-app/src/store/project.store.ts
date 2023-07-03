import { makeAutoObservable, runInAction } from "mobx";
import { Project, ProjectCreate, ProjectUpdate } from "../models/Project";
import agent from "../api/agent";
import URLImage from "../utils/URL";
import { Pagination, PagingParams } from "../models/Pagination";
import { router } from "../routes/Routes";

export default class ProjectStore {
  projectRegistry = new Map<string, Project>();
  projectSelected: Project | null = null;
  tableBody: any[] = [];
  formBody: any = new ProjectCreate();

  pagination: Pagination | null = null;
  pagingParams: PagingParams = new PagingParams(1, 8);
  predicate = new Map().set("showHidden", false);
  loading: boolean = false;
  submitLoading: boolean = false;
  showMode: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  private get axiosParams() {
    const params = new URLSearchParams();
    params.append("currentPage", this.pagingParams.currentPage.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  private setProject = (data: Project) => {
    data.imagePreview = data.image && URLImage(data.image);
    data.student.image = data.student.image && URLImage(data.student.image);
    data.keyWordList = data.keyWords
      ? Array.from(data.keyWords.split(","))
      : [];
    data.consultants = data.consultants || [];
    this.projectRegistry.set(data.id, data);
    return data;
  };

  setShowMode = (val: number) => (this.showMode = val);

  setTable = (temp: any[]) => (this.tableBody = temp);
  private setPagination = (pagination: Pagination) =>
    (this.pagination = pagination);
  setPagingParams = (page: number, pageSize: number) => {
    this.pagingParams = { currentPage: page, pageSize };
    this.setPagination({
      ...this.pagination!,
      currentPage: page,
    });
  };
  setPredicate = (obj: {}) =>
    Object.entries(obj).map(([key, val]) => this.predicate.set(key, val));

  loadProjects = async () => {
    this.loading = true;
    this.projectRegistry.clear();
    try {
      var response = await agent.Projects.list(this.axiosParams);
      runInAction(() => {
        response.data.forEach(this.setProject);
        this.setPagination(response.pagination);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  loadProject = async (id: string) => {
    this.loading = true;
    try {
      let response = await agent.Projects.getOne(id);
      return runInAction(() => {
        this.loading = false; 
        return this.projectSelected = this.setProject(response);
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  loadProjectByUsername = async (username: string) => {
    this.loading = true;
    this.projectRegistry.clear();
    try {
      let response = await agent.Projects.getByUserName(username);
      runInAction(() => {
        response.forEach(this.setProject);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  hidden = async (project: Project) => {
    try {
      await agent.Projects.hidden(project.id);
      runInAction(() => {
        this.projectRegistry.set(project.id, {
          ...project,
          isUsed: !project.isUsed,
        });
      });
    } catch (error) {
      throw error;
    }
  };

  setProjectSelect = (id: string) => {
    let project = this.projectRegistry.get(id);

    if (!project) router.navigate("*");
    else this.projectSelected = project;
  };

  setFormBody = (obj: {}) => {
    this.formBody = Object.assign(this.formBody!, obj);
  };

  clearProjectSelected = () => (this.projectSelected = null);
  clearProjectRegistry = () => this.projectRegistry.clear();
  clearFormBody = () => (this.formBody = new ProjectCreate());

  createProject = async () => {
    if (!this.formBody.fileImage) throw "กรุณาอัพโหลดรูปภาพ";
    if (!this.formBody.filePDF) throw "กรุณาอัพโหลดไฟล์เอกสารงานวิจัย";
    this.formBody!.keyWords = this.formBody!.keyWordList.join();
    this.submitLoading = true;
    try {
      await agent.Projects.create(this.formBody!);
      runInAction(() => {
        this.clearFormBody();
        this.submitLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submitLoading = false));
      throw error;
    }
  };

  updateProject = async () => {
    this.submitLoading = true;
    this.formBody!.keyWords = this.formBody!.keyWordList.join();
    try {
      var currentProject = this.projectRegistry.get(this.formBody.id);
      await agent.Projects.edit(this.formBody);
      runInAction(() => {
        this.projectRegistry.set(
          this.formBody.id,
          Object.assign(currentProject!, {
            imagePreview:
              this.formBody.fileImage &&
              URL.createObjectURL(this.formBody.fileImage!),
          })
        );
        this.submitLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submitLoading = false));
      throw error;
    }
  };

  deleteProject = async (id: string) => {
    this.loading = true;
    try {
      await agent.Projects.delete(id);
      runInAction(() => {
        this.projectRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };
}
