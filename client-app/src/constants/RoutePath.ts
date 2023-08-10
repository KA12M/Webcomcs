import { config } from "./config";

const HOST = config.baseURL ?? "/";

export const RoutePath = {
  home: HOST,
  account: `${HOST}account`,
  projects: `${HOST}projects`,
  projectForm: `${HOST}project-form`,
  students: `${HOST}student`,
  syllabus: `${HOST}syllabus`,
  lecturers: `${HOST}lecturer`,
  courses: `${HOST}courses`,
  news: `${HOST}newses`,
  comsciSubjectPage: `${HOST}comsci-subjects`,
  comsciSubjectDetail: (id: string) => `${HOST}comsci-subjects/${id}`,
  coursesForm: `${HOST}courses/form`,
  studentJobHistory: `${HOST}student-job-history`,
  accountDetail: (username: string) => `${HOST}account/${username}`,
  projectDetail: (id: string) => `${HOST}projects/${id}`,
  projectFormEdit: (id: string) => `${HOST}project-form/${id}`,
  newsDetail: (id: string) => `${HOST}newses/${id}`,
  courseDetail: (id: string) => `${HOST}courses/${id}`,
  generationDetail: (genId: string) => `${HOST}courses/${genId}/generation`,
  coursesFormEdit: (id: string) => `${HOST}courses/form/${id}`,
};

export const RouteSecret = {
  home: `${HOST}secret`,
  userManage: `${HOST}secret/user`,
  projectManage: `${HOST}secret/project-manage`,
  newsManage: `${HOST}secret/news-manage`,
  homePhotoManage: `${HOST}secret/home-photo`,
  settingMange: `${HOST}secret/settings`,
  lecturerMange: `${HOST}secret/lecturer-manage`,
  syllabusManage: `${HOST}secret/syllabus-manage`,
  jobHistoryManage: `${HOST}secret/job-history`,
  comsciSubjectManage: `${HOST}secret/comsci-subject-manage`,
};
