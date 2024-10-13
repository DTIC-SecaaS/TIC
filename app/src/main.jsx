import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Dashboard from "./dashboard/Dashboard.jsx";
import Vulnerabilities from "./vulnerabilities/Vulnerabilities.jsx";
// import { AuthProvider } from "./auth/AuthProvider";
import App from "./App.jsx";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "./auth/Keycloak.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/home",
    element: <Dashboard />,
  },
  {
    path: "/vulns",
    element: <Vulnerabilities />,
  },
  {
    path: "/assets",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <ReactKeycloakProvider keycloak={Keycloak}>
    <App />
  </ReactKeycloakProvider>
);
