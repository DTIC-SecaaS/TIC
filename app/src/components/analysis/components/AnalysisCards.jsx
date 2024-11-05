import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Copyright from "../../shared/Copyright";
import PropTypes from "prop-types";

const AnalysisCards = ({ onNewAnalysis }) => {
  const [analyses, setAnalyses] = useState([
    {
      id: 1,
      name: "Análisis 1",
      status: "completed",
      startTime: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      name: "Análisis 2",
      status: "in_progress",
      startTime: new Date().toLocaleTimeString(),
    },
  ]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const handleNewAnalysis = () => {
    // const newAnalysis = {
    //   id: analyses.length + 1,
    //   name: `Análisis ${analyses.length + 1}`,
    //   status: "in_progress",
    //   startTime: new Date().toLocaleTimeString(),
    //   active: "Activo 1",
    //   tools: ["Tool A", "Tool B", "Tool C"],
    //   estimatedTime: "3 minutos",
    // };
    // setAnalyses([...analyses, newAnalysis]);

    // setTimeout(() => {
    //   setAnalyses((prev) =>
    //     prev.map((analysis) =>
    //       analysis.id === newAnalysis.id
    //         ? { ...analysis, status: "completed" }
    //         : analysis
    //     )
    //   );
    // }, 3000);
    onNewAnalysis();
  };

  const handleViewDetails = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  const handleCloseDialog = () => {
    setSelectedAnalysis(null);
  };

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
          onClick={handleNewAnalysis}
          sx={{ marginBottom: 4 }}
        >
          Iniciar nuevo análisis
        </Button>
        <Grid container spacing={3} sx={{ maxWidth: 1200 }}>
          {analyses.map((analysis) => (
            <Grid xs={12} sm={6} md={4} key={analysis.id}>
              <Card
                sx={{
                  height: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {analysis.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginTop: 1 }}
                  >
                    Hora de inicio: {analysis.startTime}
                  </Typography>
                  {analysis.status === "in_progress" ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 2,
                      }}
                    >
                      <CircularProgress size={24} sx={{ marginRight: 1 }} />
                      <Typography variant="body2">En progreso...</Typography>
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ marginTop: 2 }}
                    >
                      Completado
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", padding: 2 }}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleViewDetails(analysis)}
                  >
                    Ver detalles
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Dialogo para mostrar detalles del análisis */}
      <Dialog open={!!selectedAnalysis} onClose={handleCloseDialog}>
        <DialogTitle>Detalles del Análisis</DialogTitle>
        <DialogContent>
          {selectedAnalysis && (
            <>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: 1 }}
              >
                Nombre: {selectedAnalysis.name}
              </Typography>
              <Typography variant="body2">
                Hora de inicio: {selectedAnalysis.startTime}
              </Typography>
              <Typography variant="body2">
                Activo analizado: {selectedAnalysis.active}
              </Typography>
              <Typography variant="body2">
                Herramientas usadas:{" "}
                {selectedAnalysis.tools?.join(", ") || "No especificadas"}
              </Typography>
              <Typography variant="body2">
                Tiempo estimado de análisis:{" "}
                {selectedAnalysis.estimatedTime || "Desconocido"}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Ubicar el Copyright al final */}
      <Copyright sx={{ marginTop: "auto", my: 4 }} />
    </Box>
  );
};

AnalysisCards.propTypes = {
  onNewAnalysis: PropTypes.func.isRequired,
};

export default AnalysisCards;
