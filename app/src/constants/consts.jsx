import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import TroubleshootRoundedIcon from "@mui/icons-material/TroubleshootRounded";
// import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
// import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

export const menuContentMainItems = [
  { key: "home", text: "Inicio", icon: <HomeRoundedIcon />, route: "/" },
  {
    key: "vulnerabilities",
    text: "Vulnerabilidades",
    icon: <AnalyticsRoundedIcon />,
    route: "/vulns",
  },
  {
    key: "assets",
    text: "Activos",
    icon: <AssignmentRoundedIcon />,
    route: "/assets",
  },
  {
    key: "analysis",
    text: "Análisis",
    icon: <TroubleshootRoundedIcon />,
    route: "/analysis",
  },
];

export const menuContentSecondaryItems = [
  {
    key: "settings",
    text: "Configuración",
    icon: <SettingsRoundedIcon />,
    route: "/settings",
  },
  // { key: "about", text: "About", icon: <InfoRoundedIcon /> },
  // { key: "feedback", text: "Feedback", icon: <HelpRoundedIcon /> },
];

export const optionsUserProfile = [
  { key: "profile", text: "Perfil", route: "/profile" },
  { key: "account", text: "Mi cuenta", route: "/account" },
  { key: "logout", text: "Cerrar sesión" },
];

export const optionsAppNavbar = [
  { key: "dashboard", text: "Dashboard", route: "/" },
  { key: "home", text: "Inicio", route: "/" },
  { key: "vulnerabilities", text: "Vulnerabilidades", route: "/vulns" },
  { key: "assets", text: "Activos", route: "/assets" },
  { key: "settings", text: "Configuración", route: "/settings" },
];

export const notificationsItems = [
  { key: "notification", text: "Notificaciones" },
];

export const dashboardItems = [
  { key: "users", text: "Usuarios" },
  { key: "overview", text: "Visión General" },
  { key: "expOvTime", text: "Exposición en el tiempo" },
  { key: "vulnerabilities", text: "Vulnerabilidades" },
  { key: "critic", text: "Crítico" },
  { key: "high", text: "Alto" },
  { key: "medium", text: "Medio" },
  { key: "low", text: "Bajo" },
  { key: "info", text: "Información" },
  { key: "analizedAssets", text: "Activos analizados" },
  { key: "analizedAssetsInYear", text: "Activos analizados en el año" },
  { key: "trend", text: "Tendencia" },
  { key: "vulnerability", text: "Vulnerabilidad" },
  { key: "risk", text: "Riesgo" },
  { key: "service", text: "Servicio" },
];

export const vulnsItems = [
  { key: "vulnerabilityName", text: "Nombre" },
  { key: "target", text: "Objetivo" },
  { key: "hostname", text: "Nombre del host" },
  { key: "dateDiscover", text: "Fecha de descubrimiento" },
  { key: "port", text: "Puerto" },
  { key: "state", text: "Estado" },
  { key: "version", text: "Versión" },
  { key: "tool", text: "Herramienta" },
  { key: "risk", text: "Riesgo" },
  { key: "service", text: "Servicio" },
  { key: "vulnerabilities", text: "Vulnerabilidades" },
];

export const assetItems = [
  { key: "assets", text: "Activos" },
  { key: "name", text: "Nombre" },
  { key: "ip", text: "URL / IP" },
];

export const getOptionTextByKey = (options, key) => {
  const option = options.find((option) => option.key === key);
  return option ? option.text : null;
};
