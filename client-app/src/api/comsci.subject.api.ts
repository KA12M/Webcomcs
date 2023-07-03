import { req } from "./agent";
import { ComSciSubject, ComSciSubjectCreate, ComSciSubjectDetail, ComSciSubjectUpdate } from "../models/ComSciSubject";

export const ComSciSubjects = {
  list: () => req.get<ComSciSubject[]>("/comsciSubject"),
  detail: (id: string) => req.get<ComSciSubjectDetail>(`/comsciSubject/${id}`),
  create: (data: ComSciSubjectCreate) =>
    req.post<ComSciSubjectDetail>("/comsciSubject", data),
  update: (data: ComSciSubjectUpdate) =>
    req.put<ComSciSubjectDetail>("/comsciSubject", data),
  delete: (id: string) => req.delete(`/comsciSubject/${id}`),
};
