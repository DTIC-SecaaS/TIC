import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { getOptionTextByKey, dashboardItems } from "../../../constants/consts";

export default function PageViewsBarChart() {
  const theme = useTheme();
  // const colorPalette = [
  //   (theme.vars || theme).palette.primary.dark,
  //   (theme.vars || theme).palette.primary.main,
  //   (theme.vars || theme).palette.primary.light,
  // ];
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    "#5a9fed",
    (theme.vars || theme).palette.primary.light,
    "#4d6e94",
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {getOptionTextByKey(dashboardItems, "analizedAssets")}
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
              1.3M
            </Typography>
            <Chip size="small" color="error" label="-8%" />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {getOptionTextByKey(dashboardItems, "analizedAssetsInYear")}
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "band",
              categoryGapRatio: 0.5,
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
              id: "activo1",
              label: "Activo 1",
              data: [
                2234, 3872, 2998, 4125, 3357, 2789, 2998, 3872, 2998, 4125,
                3357, 2789, 2998,
              ],
              stack: "A",
            },
            {
              id: "activo2",
              label: "Activo 2",
              data: [
                3098, 4215, 2384, 2101, 4752, 3593, 2384, 4215, 2384, 2101,
                4752, 3593, 2384,
              ],
              stack: "A",
            },
            {
              id: "activo3",
              label: "Activo 3",
              data: [
                4051, 2275, 3129, 4693, 3904, 2038, 2275, 2275, 3129, 4693,
                3904, 2038, 2275,
              ],
              stack: "A",
            },
            {
              id: "activo4",
              label: "Activo 4",
              data: [
                398, 415, 384, 201, 752, 593, 284, 215, 384, 101, 752, 353, 384,
              ],
              stack: "A",
            },
            {
              id: "activo5",
              label: "Activo 5",
              data: [
                4401, 2375, 429, 463, 525, 38, 225, 225, 329, 463, 904, 238,
                275,
              ],
              stack: "A",
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
