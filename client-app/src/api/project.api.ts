import { Project, ProjectCreate, ProjectUpdate } from "../models/Project";
import { req } from "./agent";

export const Projects = {
  list: () => req.get<Project[]>("/project"),
  getOne: (id: string) => req.get<Project>(`/project/${id}`),
  create: (data: ProjectCreate) =>
    req.post<ProjectCreate>("/project", data),
  edit: (data: ProjectUpdate) => req.put<ProjectUpdate>("/project", data),
  delete: (id: string) => req.delete(`/project/${id}`),
};
