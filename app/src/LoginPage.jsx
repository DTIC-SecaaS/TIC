// import React from "react";
// import { useAuthContext } from "./auth/AuthProvider"; // Asegúrate de que la ruta sea correcta

// function LoginPage() {
//   const { login } = useAuthContext(); // Obtiene la función login desde el contexto

//   return (
//     <div className="login-page">
//       <h1>Welcome to My Awesome React App</h1>
//       <h2>Secured with Keycloak</h2>
//       <button onClick={login} className="m-1" label="Login" severity="success">
//         Login
//       </button>
//     </div>
//   );
// }

// export default LoginPage;
import React from "react";
import { useAuthContext } from "./auth/AuthProvider";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import { Container, Box, Typography, Button } from "@mui/material";
import logo from "./assets/Logo_DTIC_2.png";

function LoginPage() {
  const { login } = useAuthContext();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        overflow: "auto",
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
            "url('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnRmenZnc2drOGVmYmo1YnFpdmluNDU4aWZmN2FxMWg3dG80ZGJrYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U3qYN8S0j3bpK/giphy.gif')",
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          <img
            src={logo}
            alt="Logo de la aplicación"
            style={{ width: 160, borderRadius: 8 }}
          />
        </Box>
        <Typography
          variant="h1"
          component="h1"
          sx={{ color: "#66fcf1", marginBottom: 2, textAlign: "center" }}
        >
          Análisis de Vulnerabilidades
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
          Descubre y analiza las vulnerabilidades en tus sistemas críticos,
          mientras obtienes recomendaciones personalizadas para fortalecer tu
          infraestructura. Con nuestra herramienta, no solo identificarás
          riesgos, sino que también recibirás estrategias efectivas para mejorar
          tu postura de seguridad y proteger tus activos más valiosos.
        </Typography>
        <Button
          onClick={login}
          variant="contained"
          startIcon={<SecurityRoundedIcon />}
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
          Ingresar
        </Button>
      </Container>
    </Box>
  );
}

export default LoginPage;
