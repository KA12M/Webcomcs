import { createContext, useContext } from "react";

import commonStore from "./common.store";
import modalStore from "./modal.store";
import accountStore from "./account.store";
import userStore from "./user.store";
import sideBarStore from "./sidebar.store";
import { homePhotoStore } from "./homephoto.store";
import { settingStore } from "./setting.store";
import newsStore from "./news.store";
import ProjectStore from "./project.store";
import { LecturerStore } from "./lecturer.store";
import SyllabusStore from "./syllabus.store";
import JobHistoryStore from "./jobHistory.store";
import CourseStore from "./course.store";
import GenerationStore from "./generation.store";
import { CourseCommentStore } from "./course-comment.store";
import ComSciSubject from "./comsci.subject.store";
import { ReportStore } from "./report.store";

interface Store {
  commonStore: commonStore;
  modalStore: modalStore;
  accountStore: accountStore;
  userStore: userStore;
  sideBarStore: sideBarStore;
  homePhotoStore: homePhotoStore;
  settingStore: settingStore;
  newsStore: newsStore;
  projectStore: ProjectStore;
  lecturerStore: LecturerStore;
  syllabusStore: SyllabusStore;
  jobHistoryStore: JobHistoryStore;
  courseStore: CourseStore;
  generationStore: GenerationStore;
  courseCommentStore: CourseCommentStore;
  comSciSubject: ComSciSubject;
  reportStore: ReportStore;
}

export const store: Store = {
  commonStore: new commonStore(),
  modalStore: new modalStore(),
  accountStore: new accountStore(),
  userStore: new userStore(),
  sideBarStore: new sideBarStore(),
  homePhotoStore: new homePhotoStore(),
  settingStore: new settingStore(),
  newsStore: new newsStore(),
  projectStore: new ProjectStore(),
  lecturerStore: new LecturerStore(),
  syllabusStore: new SyllabusStore(),
  jobHistoryStore: new JobHistoryStore(),
  courseStore: new CourseStore(),
  generationStore: new GenerationStore(),
  courseCommentStore: new CourseCommentStore(),
  comSciSubject: new ComSciSubject(),
  reportStore: new ReportStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
