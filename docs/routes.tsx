import type { RouteObject } from "react-router";
import { Layout } from "./Layout";
import ComponentPage from "./pages/Component";
import Foundation from "./pages/Foundations";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export const routes: RouteObject[] = [
  { element: <Layout />, children: [
    { index: true, element: <Home /> },
    { path: "foundations/:page", element: <Foundation /> },
    { path: "components/:slug", element: <ComponentPage /> },
    { path: "*", element: <NotFound /> },
  ] },
];
