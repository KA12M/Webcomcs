import { Lecturer } from "../models/Lecturer";
import { req } from "./agent";
import { LecturerCreate, LecturerUpdate } from "../models/Lecturer";

export const Lecturers = {
  list: (params: URLSearchParams) =>
    req.get<Lecturer[]>("/lecturer", { params }),
  getOne: (id: string) => req.get<Lecturer>(`/lecturer/${id}`),
  create: (data: LecturerCreate) =>
    req.postForm("/lecturer", buildFormLecturer(data)),
  edit: (data: LecturerUpdate) =>
    req.putForm("/lecturer", buildFormLecturer(data)),
  delete: (id: string) => req.delete(`/lecturer/${id}`),
  hidden: (id: string) => req.post(`/lecturer/${id}/hidden`),
};

const buildFormLecturer = (data: LecturerCreate | LecturerUpdate) => {
  var formData = new FormData();
  Object.entries(data).forEach(([key, val]) => {
    if (val) formData.append(key, val);
  });
  return formData;
};
