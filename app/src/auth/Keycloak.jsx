import Keycloak from "keycloak-js";

const initOptions = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  onLoad: "check-sso", // check-sso | login-required
  KeycloakResponseType: "code",
};

const keycloak = new Keycloak(initOptions);

export default keycloak;
