import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../containers/App";
import { PrivateRoute } from "../utils/PrivateRoute";

import LayoutPublic from "../containers/public";
import LayoutPrivate from "../containers/private";

import HomePage from "../views/public/home/HomePage";
import UserPage from "../views/private/userPage/UserPage";
import HomePhotoPage from "../views/private/general/HomePhotos/HomePhotoPage";
import SettingPage from "../views/private/settingPage/SettingPage";
import AccountPage from "../views/public/account/AccountPage";
import NewsDetail from "../views/public/home/news-detail/NewsDetail";
import NewsManage from "../views/private/general/NewsManage/NewsManage";
import Notfound404 from "../containers/404";
import ProjectManage from "../views/private/project/ProjectManage";
import ProjectDetail from "../views/public/project/project-detail/ProjectDetail";
import ProjectPage from "../views/public/project/project-page/ProjectPage";
import { RoleLabel, UserRole } from "../constants/UserRole";
import StudentPage from "../views/public/student/StudentPage";
import HomeDashboard from "../views/private/home/HomeDashboard";
import LecturerManage from "../views/private/lecturer/LecturerManage";
import LecturerPage from "./../views/public/lecturer/LecturerPage";
import SyllabusPage from "../views/public/syllabus/SyllabusPage";
import SyllabusManage from "../views/private/syllabus/SyllabusManage";
import JobHistoryManage from "../views/private/job-history/JobHistoryManage";
import CoursePage from "../views/public/course/course-page/CoursePage";
import CourseDetail from "../views/public/course/course-detail/CourseDetail";
import GenerationDetail from "../views/public/course/generation-detail/GenerationDetail";
import CourseFormPage from "../views/public/account/course-manage/CourseFormPage";
import NewsPage from "../views/public/news/NewsPage";
import JobHistoryPage from "../views/public/job-history/JobHistoryPage";
import ProjectPageForm from "../views/public/project/project-form/ProjectPageForm";
import { RoutePath, RouteSecret } from "../constants/RoutePath";
import ComsciSubjectManage from "../views/private/comsci-subject/ComsciSubjectManage";
import ComsciSubjectPage from "../views/public/comsci-subject/ComsciSubjectPage";
import ComsciSubjectDetail from "../views/public/comsci-subject/Detail/ComsciSubjectDetail";

export const Routes = (
  <Route path={RoutePath.home} element={<App />}>
    <Route path="*" element={<Notfound404 />} />

    <Route path={RoutePath.home} element={<LayoutPublic />}>
      <Route path="" element={<HomePage />} />
      <Route path={RoutePath.account} element={<AccountPage />} />
      <Route
        path={`${RoutePath.account}/:username`}
        element={<AccountPage />}
      />
      <Route path={RoutePath.projects} element={<ProjectPage />} />
      <Route path={RoutePath.students} element={<StudentPage />} />
      <Route path={RoutePath.lecturers} element={<LecturerPage />} />
      <Route path={RoutePath.syllabus} element={<SyllabusPage />} />
      <Route path={`${RoutePath.projects}/:id`} element={<ProjectDetail />} />
      <Route path={RoutePath.courses} element={<CoursePage />} />
      <Route path={RoutePath.news} element={<NewsPage />} />
      <Route
        path={RoutePath.comsciSubjectPage}
        element={<ComsciSubjectPage />}
      />
      <Route
        path={`${RoutePath.comsciSubjectPage}/:id`}
        element={<ComsciSubjectDetail />}
      />
      <Route path={RoutePath.studentJobHistory} element={<JobHistoryPage />} />
      <Route path={`${RoutePath.news}/:id`} element={<NewsDetail />} />
      <Route path={`${RoutePath.courses}/:id`} element={<CourseDetail />} />
      <Route
        path={`${RoutePath.courses}/:id/generation`}
        element={<GenerationDetail />}
      />

      <Route
        element={
          <PrivateRoute
            roles={[
              RoleLabel[UserRole.admin]["en"],
              RoleLabel[UserRole.student]["en"],
            ]}
          />
        }
      >
        <Route path={RoutePath.projectForm} element={<ProjectPageForm />} />
        <Route
          path={`${RoutePath.projectForm}/:id`}
          element={<ProjectPageForm />}
        />
      </Route>
      <Route
        element={
          <PrivateRoute
            roles={[
              RoleLabel[UserRole.admin]["en"],
              RoleLabel[UserRole.lecturer]["en"],
            ]}
          />
        }
      >
        <Route path={RoutePath.coursesForm} element={<CourseFormPage />} />
        <Route
          path={`${RoutePath.coursesForm}/:id`}
          element={<CourseFormPage />}
        />
      </Route>
    </Route>

    <Route element={<PrivateRoute roles={[RoleLabel[UserRole.admin]["en"]]} />}>
      <Route path={RouteSecret.home} element={<LayoutPrivate />}>
        <Route path="" element={<HomeDashboard />} />
        <Route path={RouteSecret.homePhotoManage} element={<HomePhotoPage />} />
        <Route path={RouteSecret.newsManage} element={<NewsManage />} />
        <Route path={RouteSecret.userManage} element={<UserPage />} />
        <Route path={RouteSecret.settingMange} element={<SettingPage />} />
        <Route path={RouteSecret.projectManage} element={<ProjectManage />} />
        <Route path={RouteSecret.syllabusManage} element={<SyllabusManage />} />
        <Route path={RouteSecret.lecturerMange} element={<LecturerManage />} />
        <Route
          path={RouteSecret.comsciSubjectManage}
          element={<ComsciSubjectManage />}
        />
        <Route
          path={RouteSecret.jobHistoryManage}
          element={<JobHistoryManage />}
        />
      </Route>
    </Route>
  </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(Routes));
