import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { getOptionTextByKey, dashboardItems } from "../../../constants/consts";

// function getDaysInMonth(month, year) {
//   const date = new Date(year, month, 0);
//   const monthName = date.toLocaleDateString("en-US", {
//     month: "short",
//   });
//   const daysInMonth = date.getDate();
//   const days = [];
//   let i = 1;
//   while (days.length < daysInMonth) {
//     days.push(`${monthName} ${i}`);
//     i += 1;
//   }
//   return days;
// }

function renderSparklineCell(params) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={["hsl(210, 98%, 42%)"]}
        xAxis={{
          scaleType: "band",
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status) {
  const colors = {
    Crítico: "error",
    Alto: "warning",
    Medio: "secondary",
    Bajo: "success",
    Información: "primary",
  };

  return (
    <Chip
      label={status}
      color={colors[status]}
      size="small"
      variant="outlined"
    />
  );
}

// export function renderAvatar(params) {
//   if (params.value == null) {
//     return "";
//   }

//   return (
//     <Avatar
//       sx={{
//         backgroundColor: params.value.color,
//         width: "24px",
//         height: "24px",
//         fontSize: "0.85rem",
//       }}
//     >
//       {params.value.name.toUpperCase().substring(0, 1)}
//     </Avatar>
//   );
// }

export const columns = [
  {
    field: "vulnerability",
    headerName: getOptionTextByKey(dashboardItems, "vulnerability"),
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: "risk",
    headerName: getOptionTextByKey(dashboardItems, "risk"),
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value),
  },
  // {
  //   field: "users",
  //   headerName: "Users",
  //   headerAlign: "right",
  //   align: "right",
  //   flex: 1,
  //   minWidth: 80,
  // },
  {
    field: "service",
    headerName: getOptionTextByKey(dashboardItems, "service"),
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
  },
  // {
  //   field: "viewsPerUser",
  //   headerName: "Views per User",
  //   headerAlign: "right",
  //   align: "right",
  //   flex: 1,
  //   minWidth: 120,
  // },
  // {
  //   field: "averageTime",
  //   headerName: "Average Time",
  //   headerAlign: "right",
  //   align: "right",
  //   flex: 1,
  //   minWidth: 100,
  // },
  // {
  //   field: "conversions",
  //   headerName: "Daily Conversions",
  //   flex: 1,
  //   minWidth: 150,
  //   renderCell: renderSparklineCell,
  // },
];

export const rows = [
  {
    id: 1,
    vulnerability: "Homepage Overview",
    risk: "Crítico",
    service: "HTTP",
  },
  {
    id: 2,
    vulnerability: "Homepage Overview",
    risk: "Alto",
    service: "FTP",
  },
  {
    id: 3,
    vulnerability: "Homepage Overview",
    risk: "Medio",
    service: "SSH",
  },
  {
    id: 4,
    vulnerability: "Homepage Overview",
    risk: "Bajo",
    service: "SSH",
  },
  {
    id: 5,
    vulnerability: "Homepage Overview",
    risk: "Información",
    service: "RDP",
  },
  {
    id: 6,
    vulnerability: "Homepage Overview",
    risk: "Información",
    service: "MSSQL",
  },
  {
    id: 7,
    vulnerability: "Homepage Overview",
    risk: "Bajo",
    service: "FTL",
  },
  {
    id: 8,
    vulnerability: "Homepage Overview",
    risk: "Medio",
    service: "TELNET",
  },
  {
    id: 9,
    vulnerability: "Homepage Overview",
    risk: "Alto",
    service: "SSH",
  },
  {
    id: 10,
    vulnerability: "Homepage Overview",
    risk: "Crítico",
    service: "HTTPS",
  },
  {
    id: 11,
    vulnerability: "Homepage Overview",
    risk: "Crítico",
    service: "TELNET",
  },
  {
    id: 12,
    vulnerability: "Homepage Overview",
    risk: "Alto",
    service: "SSH",
  },
  {
    id: 13,
    vulnerability: "Homepage Overview",
    risk: "Medio",
    service: "HTTPS",
  },
];
