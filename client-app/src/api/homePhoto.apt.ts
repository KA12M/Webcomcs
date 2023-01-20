import { req, multipleDataOption } from "./agent";
import { HomePhoto, HomePhotoUpdate, PhotoCreate } from "../models/HomePhoto";

export const HomePhotos = {
  list: (params: URLSearchParams) =>
    req.get<HomePhoto[]>("/homePhoto", { params }),
  getOne: (id: string) => req.get<HomePhoto>(`/homePhoto/${id}`),
  add: (data: PhotoCreate) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("FileImages", data.fileImage!);
    req.post(`/homePhoto`, formData, multipleDataOption);
  },
  edit: (data: HomePhotoUpdate) => req.post(`/homePhoto`, data),
  enable: (id: string) => req.patch(`/homePhoto/${id}/enable`),
  delete: (id: string) => req.delete(`/homePhoto/${id}`),
};
