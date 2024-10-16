import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../../shared/Copyright";
import AssetDataGrid from "./AssetDataGrid";

import { assetItems, getOptionTextByKey } from "../../../constants/consts";

export default function MainPage() {
  return (
    <Box
      sx={{
        width: "1250px",
        maxWidth: { sm: "100%", md: "100%" },
        px: 5,
        mx: "auto",
      }}
    >
      {/* cards */}
      <Typography
        component="h2"
        variant="h6"
        sx={{ mb: 2, textAlign: "center" }}
      >
        {getOptionTextByKey(assetItems, "assets")}
      </Typography>
      <Grid container columns={12}>
        <Grid size={{ md: 12, lg: 12 }}>
          <Box sx={{ width: "100%" }}>
            <AssetDataGrid />
          </Box>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
