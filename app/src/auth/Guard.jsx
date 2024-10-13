import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./KeycloakProvider";

const Guard = ({ children }) => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Guard;
