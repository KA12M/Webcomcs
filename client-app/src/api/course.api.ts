import { req } from "./agent";
import { PaginatedResult } from "../models/Pagination";
import { GenerationForm } from "../models/Course";
import {
  CourseDetail,
  CourseForm,
  CourseList,
  GenerationDetailDTO,
  GenerationList,
} from "../models/Course";

export const Courses = {
  courseList: (params: URLSearchParams) =>
    req.get<PaginatedResult<CourseList[]>>("/course", { params }),
  courseDetail: (id: string) => req.get<CourseDetail>(`/course/${id}`),
  generationList: (params: URLSearchParams) =>
    req.get<PaginatedResult<GenerationList[]>>("/course/generations", {
      params,
    }),
  generationDetail: (genId: string) =>
    req.get<GenerationDetailDTO>(`/course/${genId}/generation`),
  joinGeneration: (genId: string) => req.post(`/course/joinCourse/${genId}`),
  cancelGeneration: (genId: string) => req.patch(`/course/${genId}/cancel`),
  createCourse: (course: CourseForm) => req.post(`/course`, course),
  editCourse: (course: CourseForm) => req.put(`/course/editCourse`, course),
  addGeneration: (gen: GenerationForm) => req.post(`/course/addGen`, gen),
  editGeneration: (gen: GenerationForm) =>
    req.put(`/course/editGeneration`, gen),
  removeGeneration: (genId: string) => req.delete(`/course/${genId}/removeGen`),
  removeCourse: (courseId: string) => req.delete(`/course/${courseId}`),
};
