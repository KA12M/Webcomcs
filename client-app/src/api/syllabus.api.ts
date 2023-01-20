import { req } from "./agent";
import { Syllabus, SyllabusCreate, SyllabusUpdate } from "../models/Syllabus";

export const Syllabuses = {
  list: () => req.get<Syllabus[]>("/syllabus"),
  getOne: (id: string) => req.get<Syllabus>(`/syllabus/${id}`),
  add: (data: SyllabusCreate) => req.post("/syllabus", data),
  edit: (data: SyllabusUpdate) => req.put("/syllabus", data),
  delete: (id: string) => req.delete(`/syllabus/${id}`),
};
