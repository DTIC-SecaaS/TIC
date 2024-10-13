import { useEffect, useState } from "react";
import Keycloak from "./Keycloak"; // Importa la instancia única de Keycloak

export const AuthProvider = ({ children }) => {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!keycloakInitialized) {
      // Verifica que Keycloak no esté ya inicializado
      Keycloak.init({ onLoad: "login-required" })
        .then((authenticated) => {
          setAuthenticated(authenticated);
          setKeycloakInitialized(true);
        })
        .catch((error) => {
          console.error("Keycloak initialization failed", error);
        });
    }
  }, [keycloakInitialized]); // Dependencia para evitar múltiples inicializaciones

  // Muestra un mensaje de carga hasta que Keycloak esté inicializado
  if (!keycloakInitialized) {
    return <div>Cargando autenticación...</div>;
  }

  // Si el usuario no está autenticado, redirige automáticamente a la página de login
  if (!authenticated) {
    return <div>Redirigiendo al login...</div>;
  }

  return children; // Si está autenticado, renderiza la aplicación
};
