import {
  Consultant,
  Project,
  ProjectCreate,
  ProjectUpdate,
} from "../models/Project";
import { req } from "./agent";
import { PaginatedResult } from "../models/Pagination";

export const Projects = {
  list: (params: URLSearchParams) =>
    req.get<PaginatedResult<Project[]>>("/project", { params }),
  getOne: (id: string) => req.get<Project>(`/project/${id}`),
  create: (data: ProjectCreate) =>
    req.postForm<ProjectCreate>("/project", FormProject(data)),
  edit: (data: ProjectUpdate) => req.putForm<ProjectUpdate>("/project", FormProject(data)),
  delete: (id: string) => req.delete(`/project/${id}`),
  hidden: (id: string) => req.post(`/project/${id}/hidden`),
  getByUserName: (userName: string) =>
    req.get<Project[]>(`/project/${userName}/username`),
};

const FormProject = (data: ProjectCreate | ProjectUpdate) => {
  var formData = new FormData();
  Object.entries(data).forEach(([key, val]) => {
    if (val) if (key == "consultants")
      val.forEach((el: Consultant, i: number) =>
        formData.append(`${key}[${i}].lecturerName`, el.lecturerName)
      );
    else formData.append(key, val);
  });
  return formData;
};
