import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../../dashboard/internals/components/Copyright";
import VulnDataGrid from "./VulnDataGrid";

import { vulnsItems, getOptionTextByKey } from "../../constants/consts";

export default function MainPage() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "100%" },
        "& .super-app-theme--header": {
          backgroundColor: "rgb(88, 104, 133)",
          color: "white",
          scrollBehavior: "smooth",
        },
      }}
    >
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {getOptionTextByKey(vulnsItems, "vulnerabilities")}
      </Typography>

      <Grid container columns={12}>
        <Grid size={{ md: 12, lg: 12 }}>
          <VulnDataGrid />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
