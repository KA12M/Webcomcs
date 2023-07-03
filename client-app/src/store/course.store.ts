import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/Pagination";
import { CourseForm, CourseList, CourseDetail } from "../models/Course";
import URLImage from "../utils/URL";
import { InterfaceMode } from "../views/public/course/course-page/components/InterfaceMode";

export default class CourseStore {
  courseRegistry = new Map<string, CourseList>();
  courseSelected: CourseDetail | null = null;
  predicate = new Map<string, any>()
    .set("hostUsername", "") 
    .set("mode", InterfaceMode.generation);

  pagination: Pagination | null = null;
  pagingParams: PagingParams = new PagingParams(1, 8);

  loading = false;
  submittingLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  clearCourseSelect = () => (this.courseSelected = null);
  clearRegistry = () => this.courseRegistry.clear();
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

  setCourse = (data: CourseList) => {
    data.lecturer.image = data.lecturer.image && URLImage(data.lecturer.image);
    data.image = data.image && URLImage(data.image);
    data.generations.forEach((val, i) => {
      data.generations[i].genPhoto = val.genPhoto && URLImage(val.genPhoto);
    });
    this.courseRegistry.set(data.id, data);
  };

  loadCourses = async () => {
    this.loading = true;
    try {
      this.courseRegistry.clear();
      var res = await agent.Courses.courseList(this.axiosParams);
      runInAction(() => {
        res.data.forEach(this.setCourse);
        this.setPagination(res.pagination);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  loadCourse = async (id: string) => {
    this.loading = true;
    try {
      var res = await agent.Courses.courseDetail(id);
      return runInAction(() => {
        res.image = res.image && URLImage(res.image);
        res.lecturer.image = res.lecturer.image && URLImage(res.lecturer.image);
        this.courseSelected = res;
        this.loading = false;
        return res;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  createCourse = async (course: CourseForm) => {
    this.submittingLoading = true;
    try {
      await agent.Courses.createCourse(course);
      runInAction(() => {
        this.submittingLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submittingLoading = false));
      throw error;
    }
  };

  updateCourse = async (course: CourseForm) => {
    this.submittingLoading = true;
    try {
      await agent.Courses.editCourse(course);
      runInAction(() => {
        this.courseSelected = Object.assign(this.courseSelected!, course);
        this.submittingLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submittingLoading = false));
      throw error;
    }
  };

  deleteCourse = async (id: string) => {
    this.loading = true;
    try {
      await agent.Courses.removeCourse(id);
      runInAction(() => {
        this.courseRegistry.delete(id);
        this.courseSelected = null;
        this.loading = false;
      });
    } catch (error) {
      throw error;
    }
  };
}
