import {
  News,
  NewsCreate,
  NewsDetail,
  NewsPhoto,
  NewsUpdate,
} from "../models/News";
import { PaginatedResult } from "../models/Pagination";
import { req } from "./agent";

export const Newses = {
  list: (params: URLSearchParams) =>
    req.get<PaginatedResult<News[]>>("/news", { params }),
  getOne: (id: string) => req.get<NewsDetail>(`/news/${id}`),
  create: (data: NewsCreate) => req.postForm("/news", buildFormNews(data)),
  edit: (data: NewsUpdate) => req.putForm("/news", buildFormNews(data)),
  setMainPhoto: (id: string, imageId: string) =>
    req.patch(`/news/${id}/setMain/${imageId}`),
  hidden: (id: string) => req.patch(`/news/${id}/hidden`),
  delete: (id: string) => req.delete(`/news/${id}`),
  deletePhoto: (id: string) => req.delete(`/news/${id}/photo`),
};

const buildFormNews = (data: NewsCreate | NewsUpdate) => {
  let formData = new FormData();
  Object.entries(data).forEach(([key, val]) => {
    if (key === "fileImages" && val)
      val?.forEach((img: any) => formData.append("fileImages", img));
    else if (key === "newsPhotos" && val)
      val.forEach((el: NewsPhoto, i: number) => {
        Object.entries(el).forEach(([key1, val1]) => {
          formData.append(`${key}[${i}][${key1}]`, val1);
        });
      });
    else if (val) formData.append(key, val);
  });
  return formData;
};
