import { News, NewsCreate, NewsDetail, NewsUpdate } from "../models/News";
import { PaginatedResult } from "../models/Pagination";
import { req, multipleDataOption } from "./agent";

export const Newses = {
  list: (params: URLSearchParams) =>
    req.get<PaginatedResult<News[]>>("/news", { params }),
  getOne: (id: string) => req.get<NewsDetail>(`/news/${id}`),
  create: (data: NewsCreate) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle!);
    formData.append("body", data.body!);
    data.fileImages?.forEach((img) => formData.append("FileImages", img));
    req.post("/news", formData, multipleDataOption);
  },
  edit: (data: NewsUpdate) => req.post("/news", data),
  setMainPhoto: (id: string, imageId: string) =>
    req.patch(`/news/${id}/setMain/${imageId}`),
  hidden: (id: string) => req.patch(`/news/${id}/hidden`),
  delete: (id: string) => req.delete(`/news/${id}`),
  deletePhoto: (id: string) => req.delete(`/news/${id}/photo`),
};
