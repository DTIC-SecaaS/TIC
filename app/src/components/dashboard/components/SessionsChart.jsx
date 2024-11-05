import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import { getOptionTextByKey, dashboardItems } from "../../../constants/consts";

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="70%" x2="30%" y2="45%">
        <stop offset="0%" stopColor={color} stopOpacity={0.8} />
        <stop offset="35%" stopColor={color} stopOpacity={0.05} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default function SessionsChart() {
  const theme = useTheme();

  const colorPalette = [
    theme.palette.error.main,
    theme.palette.warning.main,
    "#ecff99",
    theme.palette.success.main,
    theme.palette.info.main,
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {getOptionTextByKey(dashboardItems, "expOvTime")}
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              13,277
            </Typography>
            <Chip size="small" color="success" label="+35%" />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Vulnerabilidades mensuales en el año
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "point",
              data: [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic",
              ],
            },
          ]}
          series={[
            {
              id: "critic",
              label: getOptionTextByKey(dashboardItems, "critic"),
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: [
                385, 300, 600, 1200, 1500, 1800, 400, 100, 2700, 3000, 1800,
                3300,
              ],
            },
            {
              id: "high",
              label: getOptionTextByKey(dashboardItems, "high"),
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: [
                800, 900, 400, 1400, 100, 700, 300, 2000, 2600, 2900, 2300,
                3200,
              ],
            },
            {
              id: "medium",
              label: getOptionTextByKey(dashboardItems, "medium"),
              showMark: false,
              curve: "linear",
              stack: "total",
              stackOrder: "ascending",
              data: [
                1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800,
                2500, 1500,
              ],
              area: true,
            },
            {
              id: "low",
              label: getOptionTextByKey(dashboardItems, "low"),
              showMark: false,
              curve: "linear",
              stack: "total",
              stackOrder: "ascending",
              data: [
                1000, 300, 125, 600, 1300, 2000, 2400, 2200, 2600, 2800, 2500,
                1500,
              ],
              area: true,
            },
            {
              id: "info",
              label: getOptionTextByKey(dashboardItems, "info"),
              showMark: false,
              curve: "linear",
              stack: "total",
              stackOrder: "ascending",
              data: [
                200, 1510, 1202, 1701, 200, 204, 240, 1200, 1300, 2000, 3400,
                5421,
              ],
              area: true,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 10, top: 30, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-critic": {
              fill: "url('#critic')",
            },
            "& .MuiAreaElement-series-high": {
              fill: "url('#high')",
            },
            "& .MuiAreaElement-series-medium": {
              fill: "url('#medium')",
            },
            "& .MuiAreaElement-series-low": {
              fill: "url('#low')",
            },
            "& .MuiAreaElement-series-info": {
              fill: "url('#info')",
            },
          }}
          slotProps={{
            // legend: {
            //   hidden: true,
            // },
            legend: {
              direction: "row",
              position: {
                vertical: "top",
                horizontal: "middle",
              },
              itemMarkWidth: 8,
              itemMarkHeight: 3,
              markGap: 5,
              itemGap: 20,
              labelStyle: {
                fontSize: 12,
                fill: "darkBlue",
              },
            },
          }}
        >
          <AreaGradient color={theme.palette.error.main} id="critic" />
          <AreaGradient color={theme.palette.warning.main} id="high" />
          <AreaGradient color="#ecff99" id="medium" />
          <AreaGradient color={theme.palette.success.main} id="low" />
          <AreaGradient color={theme.palette.info.main} id="info" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
