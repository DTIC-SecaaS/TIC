import * as React from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./AppNavbar";
import Header from "./Header";
import SideMenu from "./SideMenu";
import AppTheme from "../../shared-theme/AppTheme";

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./theme/customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const BaseLayout = ({ currentMenu, onMenuClick, children }) => {
  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", width: "100vw" }}>
        <SideMenu onMenuClick={onMenuClick} />
        <AppNavbar onMenuClick={onMenuClick} />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            width: { sm: `calc(100% - ${240}px)` },
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header currentMenu={currentMenu} />
            {children}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default BaseLayout;
