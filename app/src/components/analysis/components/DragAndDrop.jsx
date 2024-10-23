import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Box, Button, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AnalysisSettings from "./AnalysisSettings";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_ASSETS_API_URL,
});

// Identificador para el tipo de elemento draggable
const ITEM_TYPE = "ASSET";

const Asset = ({ name, removeAsset }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    // Hook para hacer un elemento draggable
    type: ITEM_TYPE, // Tipo de elemento
    item: { name }, // Datos del elemento
    end: (item, monitor) => {
      // Función que se ejecuta al soltar el elemento
      if (monitor.didDrop()) {
        // Si el elemento fue soltado en un área de drop
        removeAsset(item.name); // Eliminar el activo cuando se suelte
      }
    },
    collect: (monitor) => ({
      // Función para recolectar información sobre el estado del elemento
      isDragging: !!monitor.isDragging(), // Indicar si el elemento está siendo arrastrado
    }),
  }));

  return (
    <Button
      ref={drag} // Referencia para hacer el elemento draggable
      variant="contained"
      color="primary"
      style={{ margin: "8px 0", opacity: isDragging ? 0.5 : 1 }} // Cambiar la opacidad si el elemento está siendo arrastrado
    >
      {name}
    </Button>
  );
};

const DropArea = ({ onDrop, droppedAsset }) => {
  // Componente para el área de drop
  const [{ isOver }, drop] = useDrop(() => ({
    // Hook para hacer un área de drop
    accept: ITEM_TYPE, // Tipo de elemento que se puede soltar
    drop: (item) => onDrop(item.name), // Función que se ejecuta al soltar un elemento
    collect: (monitor) => ({
      // Función para recolectar información sobre el estado del área de drop
      isOver: !!monitor.isOver(), // Indicar si un elemento está siendo arrastrado sobre el área de drop
    }),
  }));

  return (
    <Paper // Componente de Material-UI para el área de drop
      ref={drop} // Referencia para hacer el área de drop
      sx={{
        // Estilos del área de drop
        backgroundColor: isOver ? "#e0e0e0" : "#f5f5f5",
        border: "2px dashed gray",
        padding: "16px",
        textAlign: "center",
        minHeight: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {droppedAsset ? ( // Mostrar el activo que se ha soltado
        <Button
          variant="contained"
          color="primary"
          onClick={() => onDrop(null)} // Eliminar el activo al hacer clic
        >
          {droppedAsset} X
        </Button>
      ) : (
        <Typography variant="body2" color="textSecondary">
          Arrastra aquí un activo para analizarlo
        </Typography>
      )}
    </Paper>
  );
};

const DragAndDrop = () => {
  const [assets, setAssets] = useState([]); // Lista de activos
  const [droppedAsset, setDroppedAsset] = useState(null); // Activo que se ha soltado

  const loadAssets = async () => {
    try {
      // const response = await apiClient.get("?status=active"); // Cambia la URL según tu API
      const response = await apiClient.get(); // Cambia la URL según tu API
      setAssets(response.data.data); // Asumiendo que la respuesta es un array de activos
    } catch (error) {
      console.error("Error al cargar los activos:", error);
    }
  };

  useEffect(() => {
    loadAssets(); // Cargar activos al montar el componente
  }, []);

  // Función para manejar la eliminación del activo al soltarlo
  const handleDrop = (asset) => {
    setDroppedAsset(asset); // Establecer el activo que se ha soltado
  };

  // Función para eliminar el activo de la lista
  const removeAsset = (assetName) => {
    setAssets(
      (
        prevAssets // Actualizar la lista de activos
      ) => prevAssets.filter((asset) => asset !== assetName) // Filtrar los activos para eliminar el activo
    );
  };

  return (
    // <Box display="flex" gap={2}>
    //   {/* Área de arrastre */}
    //   <Box flex={2}>
    //     <DropArea onDrop={handleDrop} droppedAsset={droppedAsset} />
    //   </Box>

    //   {/* Lista de activos */}
    //   <Box>
    //     <Typography variant="h6">Activos</Typography>
    //     {assets.map((asset) => (
    //       <Asset key={asset} name={asset} removeAsset={removeAsset} />
    //     ))}
    //   </Box>
    // </Box>

    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid container columns={12}>
        <Grid size={{ sm: 8, md: 8, lg: 8 }}>
          <Box sx={{ px: 3 }}>
            <DropArea onDrop={handleDrop} droppedAsset={droppedAsset} />
          </Box>
          <Box sx={{ p: 3 }}>
            <AnalysisSettings />
          </Box>
        </Grid>
        <Grid
          size={{ sm: 4, md: 4, lg: 4 }}
          sx={{
            backgroundColor: "rgba(90, 104, 133, 0.12)",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Activos
          </Typography>
          {assets.map((asset) => (
            <Asset
              key={asset.name}
              name={asset.name}
              removeAsset={removeAsset}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DragAndDrop;
