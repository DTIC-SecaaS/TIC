import React from "react";
import { useAuthContext } from "./auth/AuthProvider"; // Asegúrate de que la ruta sea correcta

function LoginPage() {
  const { login } = useAuthContext(); // Obtiene la función login desde el contexto

  return (
    <div className="login-page">
      <h1>Welcome to My Awesome React App</h1>
      <h2>Secured with Keycloak</h2>
      <button onClick={login} className="m-1" label="Login" severity="success">
        Login
      </button>
    </div>
  );
}

export default LoginPage;
