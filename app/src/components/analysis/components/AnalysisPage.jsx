import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../../shared/Copyright";
import DragAndDrop from "./DragAndDrop";
import { analysisItems, getOptionTextByKey } from "../../../constants/consts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

export default function AnalysisPage({ onBack }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f6f8",
        padding: 2,
        width: "100%",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onBack}
          sx={{ mb: 2, display: "flex", alignItems: "center" }}
        >
          <ArrowCircleLeftRoundedIcon sx={{ marginRight: 1 }} />
          Regresar
        </Button>
        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, textAlign: "center" }}
        >
          {getOptionTextByKey(analysisItems, "analysis")}
        </Typography>

        <Grid container columns={12}>
          <Grid size={{ sm: 12, md: 12, lg: 12 }}>
            <DndProvider backend={HTML5Backend}>
              <div style={{ padding: "20px" }}>
                <DragAndDrop />
              </div>
            </DndProvider>
          </Grid>
          {/* <Grid
          size={{ sm: 4, md: 4, lg: 3 }}
          sx={{
            backgroundColor: "rgba(90, 104, 133, 0.12)",
          }}
        >
          hola
        </Grid> */}
        </Grid>
      </Box>
      <Copyright sx={{ marginTop: "auto", my: 4 }} />
    </Box>
  );
}

AnalysisPage.propTypes = {
  onBack: PropTypes.func.isRequired,
};
