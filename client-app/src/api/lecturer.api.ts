import { Lecturer } from "../models/User";
import { req } from "./agent";
import { LecturerCreate, LecturerUpdate } from "../models/Lecturer";

export const Lecturers = {
  list: () => req.get<Lecturer[]>("/lecturer"),
  getOne: (id: string) => req.get<Lecturer>(`/lecturer/${id}`),
  create: (data: LecturerCreate) => req.post("/lecturer", data),
  edit: (data: LecturerUpdate) => req.put("/lecturer", data),
  delete: (id: string) => req.delete(`/lecturer/${id}`),
};
