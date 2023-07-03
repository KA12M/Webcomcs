import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useStore } from "../store/store";

interface Props {
  roles?: string[];
}

export const PrivateRoute = ({ roles }: Props) => {
  let location = useLocation();
  const {
    userStore: { user },
  } = useStore();

  if (!user) return <Navigate to="/" state={{ from: location }} />;

  if (roles && !roles?.some((a) => user.roles?.includes(a)))
    return <Navigate to="/" state={{ from: location }} />;

  return <Outlet />;
};

export const NotAuth = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();
  const {
    userStore: { user },
  } = useStore();

  if (user) return <Navigate to="/" state={{ from: location }} />;

  return children;
};
