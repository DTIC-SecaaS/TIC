import React from "react";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { TipoVulnerabilidades } from "./TipoVulnerabilidades";
import { CaracteristicasVulnerabilidad } from "./CaracteristicasVulnerabilidad";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

// Estilo personalizado para un input oculto
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Componente de tarjeta que representa una carta de una lista, con opciones de configuración, imagen y eliminación
export const Card = ({
  id,
  text,
  index,
  moveCard,
  onDelete,
  color,
  needConfigure,
  needLabels,
  needImage,
}) => {
  // Estado para manejar la apertura y cierre del diálogo de configuración
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true); // Abre el diálogo
  const handleCloseDialog = () => setOpenDialog(false); // Cierra el diálogo

  // Referencia para el contenedor que recibe los elementos arrastrados
  const ref = React.useRef(null);

  // Configuración de drop (cuando un elemento es soltado)
  const [, drop] = useDrop({
    accept: "card", // Solo acepta elementos de tipo "card"
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Evita que se mueva si está en la misma posición
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Control de la dirección de arrastre para mover la tarjeta
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Mueve la tarjeta
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Configuración de drag (cuando el elemento es arrastrado)
  const [{ isDragging }, drag] = useDrag({
    type: "card", // Tipo de arrastre "card"
    item: { id, index }, // Información sobre el elemento arrastrado
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Si está siendo arrastrado
    }),
  });

  // Función para manejar la carga de una imagen
  const handleImageChange = (event) => {
    const files = event.target.files;
    console.log(files);

    // Verificar que el archivo es una imagen
    if (files && files.length > 0) {
      let file = files[0];
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        alert("Por favor, selecciona una imagen.");
        file = null;
      }
    }
  };

  // Asocia las funciones de drag y drop con la referencia del contenedor
  drag(drop(ref));

  return (
    <div
      ref={ref} // Se asigna la referencia al contenedor
      style={{
        opacity: isDragging ? 0.5 : 1, // Opacidad cuando se está arrastrando
        cursor: "move", // Cursor de movimiento al arrastrar
        border: "1px solid #ccc", // Borde de la tarjeta
        borderRadius: "12px", // Bordes redondeados
        padding: "10px", // Espaciado interno
        margin: "10px 0", // Margen superior e inferior
        backgroundColor: color, // Color de fondo
        display: "flex", // Flexbox para organizar elementos
        justifyContent: "space-between", // Espacio entre elementos
        alignItems: "center", // Alineación central
        maxWidth: "75%", // Ancho máximo
      }}
    >
      <span>{text}</span> {/* Muestra el texto de la tarjeta */}
      {/* Si necesita configuración pero no etiquetas, muestra el botón de configuración */}
      {needConfigure && !needLabels && (
        <>
          <button
            style={{
              backgroundColor: "transparent",
              color: "black",
              border: "2px solid black",
              padding: "4px",
              cursor: "pointer",
            }}
            onClick={handleOpenDialog} // Abre el diálogo
          >
            Configurar
          </button>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog} // Cierra el diálogo
            fullScreen
            PaperProps={{
              sx: {
                margin: 0,
                maxWidth: "85%",
                width: "70%",
                height: "70%",
              },
            }}
          >
            <DialogTitle>
              Detalle de Vulnerabilidades
              <Button
                onClick={handleCloseDialog} // Cierra el diálogo
                color="secondary"
                variant="outlined"
                style={{ float: "right" }}
              >
                Cerrar
              </Button>
            </DialogTitle>
            <DialogContent
              sx={{
                padding: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "calc(100% - 64px)",
              }}
            >
              <TipoVulnerabilidades hideSourceOnDrag={true} />{" "}
            </DialogContent>
          </Dialog>
        </>
      )}
      {/* Si necesita tanto configuración como etiquetas, muestra un diálogo diferente */}
      {needConfigure && needLabels && (
        <>
          <button
            style={{
              backgroundColor: "transparent",
              color: "black",
              border: "2px solid black",
              padding: "4px",
              cursor: "pointer",
            }}
            onClick={handleOpenDialog} // Abre el diálogo
          >
            Configurar
          </button>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog} // Cierra el diálogo
            fullScreen
            PaperProps={{
              sx: {
                margin: 0,
                maxWidth: "85%",
                width: "70%",
                height: "70%",
              },
            }}
          >
            <DialogTitle>
              Items de detalle
              <Button
                onClick={handleCloseDialog} // Cierra el diálogo
                color="secondary"
                variant="outlined"
                style={{ float: "right" }}
              >
                Cerrar
              </Button>
            </DialogTitle>
            <DialogContent
              sx={{
                padding: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "calc(100% - 64px)",
              }}
            >
              <CaracteristicasVulnerabilidad hideSourceOnDrag={true} />{" "}
            </DialogContent>
          </Dialog>
        </>
      )}
      {/* Si necesita imagen, muestra un botón para cargar una imagen */}
      {needImage && (
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Cargar Imagen
          <VisuallyHiddenInput
            type="file"
            onChange={handleImageChange} // Maneja el cambio de archivo
            accept="image/*" // Solo imágenes
            multiple={false} // Permite solo un archivo
          />
        </Button>
      )}
      {/* Botón para eliminar la tarjeta */}
      <button
        onClick={onDelete} // Llama a la función onDelete cuando se hace clic
        style={{
          marginLeft: "10px",
          backgroundColor: "transparent",
          color: "black",
          border: "none",
          padding: "5px 5px",
          cursor: "pointer",
        }}
      >
        X
      </button>
    </div>
  );
};
