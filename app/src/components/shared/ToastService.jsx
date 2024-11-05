import React from "react";
import { createRoot } from "react-dom/client";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

let showToast; // Variable para almacenar la función de mostrar el toast

const ToastContainer = () => {
  const [toast, setToast] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({ ...toast, open: false });
  };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={3000} // Cierra automáticamente después de 2 segundos
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={toast.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

// Inicializa el ToastContainer
const initToastService = () => {
  const rootElement = document.createElement("div");
  document.body.appendChild(rootElement);
  const root = createRoot(rootElement);
  root.render(<ToastContainer />);
};

initToastService(); // Llama a la función para inicializar el servicio

export const toast = {
  show: (message, severity) => {
    if (showToast) {
      showToast(message, severity);
    }
  },
};
