import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastProvider } from "@prumo";
import "../src/styles/index.css";
import "./docs.css";
import { LangProvider, useLang } from "./i18n";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

function Toasts({ children }: { children: ReactNode }) {
  const { t } = useLang();
  return <ToastProvider dismissLabel={t("dismiss")}>{children}</ToastProvider>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LangProvider><Toasts><RouterProvider router={router} /></Toasts></LangProvider>
  </StrictMode>,
);
