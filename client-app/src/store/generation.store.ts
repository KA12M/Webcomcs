import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/Pagination";
import {
  GenerationList,
  GenerationDetailDTO,
  GenerationForm,
} from "../models/Course";
import URLImage from "../utils/URL";
import { store } from "./store";

export default class GenerationStore {
  generationRegistry = new Map<string, GenerationList>();
  generationSelect: GenerationDetailDTO | null = null;
  predicate = new Map<string, any>().set("myCourse", false);

  pagination: Pagination | null = null;
  pagingParams: PagingParams = new PagingParams(1, 8);

  loading = false;
  submittingLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  clearGenerationSelect = () => (this.generationSelect = null);
  setPredicate = (key: string, value: any) => this.predicate.set(key, value);
  setPagination = (pagination: Pagination) => (this.pagination = pagination);
  setPagingParams = (page: number, pageSize: number) => {
    this.pagingParams = { currentPage: page, pageSize };
    this.setPagination({
      ...this.pagination!,
      currentPage: page,
    });
  };

  get axiosParams() {
    let params = new URLSearchParams();
    params.append("currentPage", this.pagingParams.currentPage.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  setGeneration = (data: GenerationList) => {
    data.genPhoto = data.genPhoto && URLImage(data.genPhoto);
    data.course.image = data.course.image && URLImage(data.course.image);
    this.generationRegistry.set(data.id, data);
  };

  loadGenerations = async () => {
    this.loading = true;
    try {
      this.generationRegistry.clear();
      var res = await agent.Courses.generationList(this.axiosParams);
      runInAction(() => {
        res.data.forEach(this.setGeneration);
        this.setPagination(res.pagination);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  loadingGeneration = async (genId: string) => {
    this.loading = true;
    try {
      var res = await agent.Courses.generationDetail(genId);
      return runInAction(() => {
        var user = store.userStore.user;
        res.generation.attendees?.forEach((val, i: number) => {
          res.generation.attendees![i].image = val.image && URLImage(val.image);
        });
        res.lecturer.image = res.lecturer.image && URLImage(res.lecturer.image);
        res.image = res.image && URLImage(res.image);
        res.isJoined = res.generation.attendees?.some(
          (a) => a.username == user?.username
        );
        this.generationSelect = res;
        this.loading = false;
        return res;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  join = async (id: string) => {
    this.submittingLoading = true;
    try {
      await agent.Courses.joinGeneration(id);
      runInAction(() => {
        var user = store.userStore.user;
        var currentUser = this.generationSelect?.generation.attendees?.find(
          (a) => a.username == user?.username
        );
        if (currentUser) {
          this.generationSelect!.generation.attendees =
            this.generationSelect!.generation.attendees!.filter(
              (a) => a.username != user?.username
            );
          this.generationSelect!.generation.attendeeCount--;
          this.generationSelect!.isJoined = false;
        } else {
          this.generationSelect?.generation.attendees?.push(
            Object.assign({ ...user, date: Date.now() })
          );
          this.generationSelect!.generation.attendeeCount++;
          this.generationSelect!.isJoined = true;
        }
        this.submittingLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submittingLoading = false));
      throw error;
    }
  };

  cancel = async (id: string) => {
    this.loading = true;
    try {
      await agent.Courses.cancelGeneration(id);
      runInAction(() => {
        this.generationSelect!.generation.isCancelled =
          !this.generationSelect!.generation.isCancelled;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  newGeneration = async (data: GenerationForm) => {
    this.submittingLoading = true;
    try {
      await agent.Courses.addGeneration(data);
      runInAction(() => {
        this.submittingLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submittingLoading = false));
      throw error;
    }
  };

  editGeneration = async (data: GenerationForm) => {
    this.submittingLoading = true;
    try {
      await agent.Courses.editGeneration(data);
      runInAction(() => {
        var current = this.generationSelect?.generation;
        this.generationSelect!.generation = Object.assign(current!, data);
        this.submittingLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submittingLoading = false));
      throw error;
    }
  };

  deleteGeneration = async (id: string) => {
    this.submittingLoading = true;
    try {
      await agent.Courses.removeGeneration(id);
      runInAction(() => {
        this.generationSelect = null;
        this.generationRegistry.delete(id);
        if (store.courseStore.courseSelected)
          store.courseStore.courseSelected!.generations =
            store.courseStore.courseSelected!.generations.filter(
              (a) => a.id != id
            );
        this.submittingLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submittingLoading = false));
      throw error;
    }
  };
}
