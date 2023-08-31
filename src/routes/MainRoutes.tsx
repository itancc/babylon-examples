import Loadable from "@/components/Loadable";
import MainLayout from "@/layouts/MainLayout";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const ExampleList = Loadable(lazy(() => import("@/pages/ExampleList")));
const ExampleDetail = Loadable(lazy(() => import("@/pages/ExampleDetail")));
const MainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    { path: "/", element: <ExampleList /> },
    { path: "/detail/:name", element: <ExampleDetail /> },
  ],
};

export default MainRoutes;
