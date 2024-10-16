import * as React from "react";
import PropTypes from "prop-types";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import {
  IndiaFlag,
  UsaFlag,
  BrazilFlag,
  GlobeFlag,
} from "../internals/components/CustomIcons";

const data = [
  { label: "Pérdida de Control de Acceso", value: 19013 },
  { label: "Fallas Criptográficas", value: 3075 },
  { label: "Inyección", value: 32078 },
  { label: "Diseño Inseguro", value: 2691 },
  { label: "Configuración de Seguridad Incorrecta ", value: 789 },
  { label: "Componentes Vulnerables y Desactualizados", value: 0 },
  { label: "Fallas de Identificación y Autenticación", value: 3897 },
  {
    label: "Fallas en el Software y en la Integridad de los Datos",
    value: 1152,
  },
  { label: "Fallas en el Registro y Monitoreo", value: 242 },
  {
    label: "Falsificación de Solicitudes del Lado del Servidor (SSRF)",
    value: 385,
  },
];

const vulnerabilities = [
  {
    name: "Pérdida de Control de Acceso",
    value: 55.97,
    flag: <IndiaFlag />,
    color: "hsl(220, 25%, 65%)",
  },
  {
    name: "Fallas Criptográficas",
    value: 46.44,
    flag: <UsaFlag />,
    color: "hsl(220, 25%, 45%)",
  },
  {
    name: "Inyección",
    value: 19.09,
    flag: <BrazilFlag />,
    color: "hsl(220, 25%, 30%)",
  },
  {
    name: "Diseño Inseguro",
    value: 24.19,
    flag: <GlobeFlag />,
    color: "hsl(220, 25%, 20%)",
  },
  {
    name: "Configuración de Seguridad Incorrecta",
    value: 19.84,
    flag: <IndiaFlag />,
    color: "hsl(220, 25%, 65%)",
  },
  {
    name: "Componentes Vulnerables y Desactualizados",
    value: 27.96,
    flag: <UsaFlag />,
    color: "hsl(220, 25%, 45%)",
  },
  {
    name: "Fallas de Identificación y Autenticación",
    value: 14.84,
    flag: <BrazilFlag />,
    color: "hsl(220, 25%, 30%)",
  },
  {
    name: "Fallas en el Software y en la Integridad de los Datos",
    value: 16.67,
    flag: <GlobeFlag />,
    color: "hsl(220, 25%, 20%)",
  },
  {
    name: "Fallas en el Registro y Monitoreo",
    value: 19.23,
    flag: <BrazilFlag />,
    color: "hsl(220, 25%, 30%)",
  },
  {
    name: "Falsificación de Solicitudes del Lado del Servidor (SSRF)",
    value: 2.72,
    flag: <GlobeFlag />,
    color: "hsl(220, 25%, 20%)",
  },
];

const StyledText = styled("text", {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ theme }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: "primary",
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== "primary",
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: "primary",
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== "primary",
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

const colors = [
  "hsl(210, 100%, 25%)", // Azul oscuro vibrante
  "hsl(340, 80%, 35%)", // Rojo oscuro vibrante
  "hsl(185, 10%, 35%)",
  "hsl(45, 80%, 35%)", // Amarillo mostaza oscuro
  "hsl(285, 70%, 30%)", // Violeta oscuro vibrante
  "hsl(25, 100%, 30%)", // Naranja quemado oscuro
  "hsl(195, 60%, 25%)", // Turquesa oscuro
  "hsl(15, 70%, 30%)", // Rojo anaranjado oscuro
  "hsl(25, 25%, 30%)", // Verde azulado oscuro
  "hsl(260, 70%, 30%)",
];

export default function ChartUserByCountry() {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flexGrow: 1,
        overflowY: "auto",
        height: "450px",
      }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          TOP 10 OWASP (2021)
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: "global", highlighted: "item" },
              },
            ]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel
              primaryText="63.08K"
              secondaryText="Total incidencias"
            />
          </PieChart>
        </Box>
        {vulnerabilities.map((country, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: "center", gap: 2, pb: 2 }}
          >
            {country.flag}
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "500" }}>
                  {country.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {country.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Number of users by country"
                value={country.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: country.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
