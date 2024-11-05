import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";

const NotFoundPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBackToHome = () => {
    setLoading(true);
    // Simulamos una carga antes de redirigir al inicio
    setTimeout(() => {
      navigate("/"); // Cambiar history.push a navigate
    }, 1000); // Cambia este valor según lo que necesites para simular la carga
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#0a0f0d",
        color: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "url('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW1lNDVrczlvZjlxZmRuMHpjMzFtNXJ5ZWhrZmIwNnlwMzdyZDBqMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sC0vNYxuMYU24/giphy.gif')",
          backgroundRepeat: "repeat",
          opacity: 0.2,
          zIndex: 1,
          pointerEvents: "none",
        }}
      ></Box>
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          backgroundColor: "transparent",
          padding: { xs: 4, sm: 6 },
          borderRadius: 2,
          boxShadow: 5,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{ color: "#66fcf1", marginBottom: 2, textAlign: "center" }}
        >
          404 - Página No Encontrada
        </Typography>
        <Typography
          sx={{
            fontSize: "1.3rem",
            marginBottom: 4,
            color: "#c5c6c7",
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          Lo sentimos, la página que buscas no existe. Por favor, verifica la
          URL o regresa al inicio.
        </Typography>
        {loading ? (
          <CircularProgress sx={{ color: "#66fcf1" }} />
        ) : (
          <Button
            onClick={handleBackToHome}
            to="/"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#45a29e",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#66fcf1",
                color: "#0a0f0d",
              },
            }}
          >
            Volver al inicio
          </Button>
        )}
      </Container>
    </Box>
  );
};

export default NotFoundPage;
