import { req } from "./agent";
import {
  Syllabus, 
  SyllabusDetail, 
} from "../models/Syllabus";

export const Syllabuses = {
  list: (params: URLSearchParams) =>
    req.get<Syllabus[]>("/syllabus", { params }),
  getOne: (id: string) => req.get<SyllabusDetail>(`/syllabus/${id}`),
  add: (data: any) => req.post("/syllabus", BuildFormSyllabus(data)),
  edit: (data: any) => req.put("/syllabus", BuildFormSyllabus(data)),
  delete: (id: string) => req.delete(`/syllabus/${id}`),
  hidden: (id: string) => req.post(`/syllabus/${id}/hidden`),
};

const BuildFormSyllabus = (data: any) => {
  data.subjects = []; 
  if (data.subjectGeneral)
    data.subjectGeneral.map((a: any) => {
      if (a) data.subjects.push({ ...a, subjectCategory: 0 });
    });
  if (data.subjectSpecific)
    data.subjectSpecific.map((a: any) => {
      if (a) data.subjects.push({ ...a, subjectCategory: 1 });
    });
  if (data.subjectFreeElective)
    data.subjectFreeElective.map((a: any) => {
      if (a) data.subjects.push({ ...a, subjectCategory: 2 });
    });
  data.objectives = data.objective;
  data.occupations = data.occupation;
  data.year = data.year ? new Date(data.year).getFullYear().toString() : data.yearPreview;
 
  return data;
};
