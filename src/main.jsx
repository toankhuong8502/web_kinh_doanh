import React from "react";
import { createRoot } from "react-dom/client";
import AdminPage from "./pages/AdminPage.jsx";
import App from "./App.jsx";
import "./styles.css";

const pathname = window.location.pathname.replace(/\/+$/, "");
const isAdminRoute =
  pathname.endsWith("/admin") ||
  new URLSearchParams(window.location.search).get("admin") === "1";

if (isAdminRoute) {
  document.title = "Quản trị cửa hàng — Mộc Mây";
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAdminRoute ? <AdminPage /> : <App />}
  </React.StrictMode>,
);
