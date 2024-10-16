import * as React from "react";
import { getOptionTextByKey, assetItems } from "../../../constants/consts";

export const columns = [
  {
    field: "name",
    headerName: getOptionTextByKey(assetItems, "name"),
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 1.5,
    minWidth: 300,
  },
  {
    field: "ip",
    headerName: getOptionTextByKey(assetItems, "ip"),
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 1.5,
    minWidth: 300,
  },
];

export const rows = [
  {
    id: 1,
    name: "Activo 1",
    ip: "192.168.30.1",
  },
  {
    id: 2,
    name: "Activo 1",
    ip: "192.168.30.1",
  },
  {
    id: 3,
    name: "Activo 1",
    ip: "192.168.30.1",
  },
  {
    id: 4,
    name: "Activo 1",
    ip: "192.168.30.1",
  },
  {
    id: 5,
    name: "Activo 1",
    ip: "192.168.30.1",
  },
  {
    id: 6,
    name: "Activo 1",
    ip: "192.168.30.1",
  },
  {
    id: 7,
    name: "Activo 1",
    ip: "192.168.30.1",
  },
  {
    id: 8,
    name: "Activo 1",
    ip: "192.168.30.1",
  },
  {
    id: 9,
    name: "Activo 1",
    ip: "192.168.30.1",
  },
  {
    id: 10,
    name: "Activo 1",
    ip: "192.168.30.1",
  },
];
