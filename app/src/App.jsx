// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./dashboard/Dashboard";
import { AuthProvider, useAuthContext } from "./auth/AuthProvider";
import Vulnerabilities from "./vulnerabilities/Vulnerabilities";

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
    return <p>Loading...</p>; // O cualquier otro indicador de carga que desees
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
      {/* Agrega más rutas según sea necesario */}
    </Routes>
  );
};

export default App;
