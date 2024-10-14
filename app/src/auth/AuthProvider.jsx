// AuthProvider.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import keycloak from "../auth/Keycloak"; // Asegúrate de que la ruta sea correcta

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isKeycloakInitialized, setIsKeycloakInitialized] = useState(false);
  const isRun = useRef(false); // Referencia para asegurarnos de que la inicialización se haga solo una vez

  useEffect(() => {
    if (isRun.current) return; // Evita re-inicializar

    isRun.current = true;

    keycloak
      .init({
        onLoad: "check-sso",
        checkLoginIframe: false,
      })
      .then((auth) => {
        setIsAuthenticated(auth);
        setIsKeycloakInitialized(true);
      });
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isKeycloakInitialized, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
