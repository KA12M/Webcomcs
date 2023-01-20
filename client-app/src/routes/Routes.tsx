import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../containers/App";
import PageTitle from "../components/PageTitle";
import { PrivateRoute } from "../utils/PrivateRoute";

import LayoutPublic from "../containers/public";
import LayoutPrivate from "../containers/private";

import HomePage from "../views/public/home/HomePage";

import UserPage from "../views/private/userPage/UserPage";
import HomePhotoPage from "../views/private/general/HomePhotos/HomePhotoPage";
import SettingPage from "../views/private/settingPage/SettingPage";
import ProfilePage from "../views/public/Profile/ProfilePage";
import Profile from "../views/public/Profile/Profile";
import NewsDetail from "../views/public/home/news-detail/NewsDetail";
import NewsManage from "../views/private/general/NewsManage/NewsManage";
import Notfound404 from "../containers/404";

export const Routes = (
  <Route path="/" element={<App />}>
    <Route path="*" element={<Notfound404 />} />

    <Route path="/" element={<LayoutPublic />}>
      <Route path="" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/news/:id" element={<NewsDetail />} />
    </Route>

    <Route element={<PrivateRoute roles={["Admin"]} />}>
      <Route path="/secret" element={<LayoutPrivate />}>
        <Route path="" element={<PageTitle text="Home" />} />
        <Route path="/secret/home-photo" element={<HomePhotoPage />} />
        <Route path="/secret/news-manage" element={<NewsManage />} />
        <Route path="/secret/user" element={<UserPage />} />
        <Route path="/secret/settings" element={<SettingPage />} />
      </Route>
    </Route>
  </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(Routes));
