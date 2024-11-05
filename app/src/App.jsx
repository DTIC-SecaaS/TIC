// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthProvider, useAuthContext } from "./auth/AuthProvider";
import Vulnerabilities from "./components/vulnerabilities/Vulnerabilities";
import NotFoundPage from "./components/pageNotFound/PageNotFound";
import Assets from "./components/assets/Assets";
import Analysis from "./components/analysis/Analysis";
import Layers from "./components/layers/Layers";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <AuthRoutes />{" "}
          {/* Usa un componente para manejar la lógica de redirección */}
        </AuthProvider>
      </div>
    </Router>
  );
}

const AuthRoutes = () => {
  const { isAuthenticated, isKeycloakInitialized } = useAuthContext();

  if (!isKeycloakInitialized) {
    // return <p>Loading...</p>;
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/vulns"
        element={isAuthenticated ? <Vulnerabilities /> : <Navigate to="/" />}
      />
      <Route
        path="/assets"
        element={isAuthenticated ? <Assets /> : <Navigate to="/" />}
      />
      <Route
        path="/analysis"
        element={isAuthenticated ? <Analysis /> : <Navigate to="/" />}
      />
      <Route
        path="/layers"
        element={isAuthenticated ? <Layers /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
//TODO concatenar todos los analisis, vulnerabilidades y activos con el usuario
