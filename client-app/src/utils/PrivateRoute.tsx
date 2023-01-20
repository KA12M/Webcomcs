import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useStore } from "../store/store";

interface Props {
  roles?: string[];
}

export function PrivateRoute({ roles }: Props) {
  let location = useLocation();
  const {
    userStore: { user },
  } = useStore();

  if (!user) return <Navigate to="/" state={{ from: location }} replace />;

  if (roles && !roles?.some((a) => user.roles?.includes(a)))
    return <Navigate to="/" state={{ from: location }} replace />;

  return <Outlet />;
}
