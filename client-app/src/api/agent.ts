import axios, { AxiosResponse } from "axios";

import { store } from "../store/store";
import { Accounts } from "./account.api";
import { message } from "antd";
import { Profiles } from "./profile.api";
import { Projects } from "./project.api";
import { Syllabuses } from "./syllabus.api";
import { SystemSettings } from "./systemSetting.api";
import { HomePhotos } from "./homePhoto.apt";
import { PaginatedResult } from "../models/Pagination";
import { Newses } from "./news.api";
import { router } from "../routes/Routes";
import { Lecturers } from "./lecturer.api";
import { JobHistories } from "./jobHistory.api";
import { Courses } from "./course.api";
import { config } from "../constants/config";
import { ComSciSubjects } from './comsci.subject.api';
import { ReportAPI } from './report.api';

axios.defaults.baseURL = config.baseAPI || "http://localhost:8000";

axios.defaults.withCredentials = true;

const wait = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const multipleDataOption = {
  headers: { "Content-Type": "multipart/formData" },
};

const responseBody = <T>(res: AxiosResponse<T>) => res.data;

axios.interceptors.request.use((config: any) => {
  const token = store.commonStore.token;
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (res) => {
    if (import.meta.env.VITE_NODE_ENV === "development") await wait(500);
    const pagination = res.headers["pagination"];
    if (pagination) {
      res.data = new PaginatedResult(res.data, JSON.parse(pagination));
      return res as AxiosResponse<PaginatedResult<any>>;
    }
    return res;
  },
  (error: any) => {
    const { status, data, headers, config } = error.response! as AxiosResponse;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          message.warning(data, 3);
        }
        if (data.errors) {
          const modelStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) modelStateErrors.push(data.errors[key]);
          }
          throw modelStateErrors.flat();
        }
        break;
      case 401:
        if (
          status === 401 &&
          headers["www-authenticate"]?.startsWith(
            'Bearer error="invalid_token"'
          )
        ) {
          store.userStore.logout();
        } else if (typeof data === "string") {
          message.warning(data, 3);
        }
        break;
      case 404:
        router.navigate("*");
        break;
      case 500:
        message.error(data);
        break;
    }
    return Promise.reject(error);
  }
);

export const req = {
  get: <T>(url: string, options = {}) =>
    axios.get<T>(url, options).then(responseBody),
  post: <T>(url: string, body = {}, options = {}) =>
    axios.post<T>(url, body, options).then(responseBody),
  postForm: <T>(url: string, body = {}) =>
    axios.post<T>(url, body, multipleDataOption).then(responseBody),
  put: <T>(url: string, body = {}, options = {}) =>
    axios.put<T>(url, body, options).then(responseBody),
  putForm: <T>(url: string, body = {}) =>
    axios.put<T>(url, body, multipleDataOption).then(responseBody),
  patch: <T>(url: string, body = {}, options = {}) =>
    axios.patch<T>(url, body, options).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

export default {
  Accounts,
  Profiles,
  Projects,
  Syllabuses,
  SystemSettings,
  HomePhotos,
  Newses,
  Lecturers,
  JobHistories,
  Courses,
  ComSciSubjects,
  ReportAPI
};
