/**
 * Componente Container2
 *
 * Este componente combina la funcionalidad de arrastrar y soltar elementos mediante React-DnD.
 * Proporciona un espacio visual dividido en dos secciones principales: una DropZone para soltar elementos
 * y una lista de DragItems que pueden ser arrastrados.
 *
 * Props:
 * - hideSourceOnDrag (boolean): (Opcional) Propiedad que puede usarse para ocultar el origen del elemento arrastrado.
 */

import React, { useState } from "react";
import { DropZone } from "./DropZone";
import { DragItem } from "./DragItem";
import { GenerateDocx } from "./GenerateDocx";

const style = {
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  dropZone: {
    flex: 3,
    padding: "5px 20px",
    borderRight: "1px solid #ccc",
  },
  dragItems: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "start",
    marginTop: "20px",
    textAlign: "center",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export const Reporte = ({ hideSourceOnDrag }) => {
  // Estado para los elementos que han sido soltados en la DropZone
  const [droppedItems, setDroppedItems] = useState([]);

  // Estado inicial para los elementos que pueden ser arrastrados
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Nombre  del Activo",
      color: "lightcoral",
      idPadre: null,
      needConfigure: false,
      needLabels: false,
    },
    {
      id: 2,
      text: "IP/URL",
      color: "lightgreen",
      idPadre: null,
      needConfigure: false,
      needLabels: false,
    },
    {
      id: 3,
      text: "Fecha análisis",
      color: "lightblue",
      idPadre: null,
      needConfigure: false,
      needLabels: false,
    },
    {
      id: 4,
      text: "Estado del activo",
      color: "lightgoldenrodyellow",
      idPadre: null,
      needConfigure: false,
      needLabels: false,
    },
    {
      id: 5,
      text: "Observación del Estado",
      color: "lightsalmon",
      idPadre: null,
      needConfigure: false,
      needLabels: false,
    },
    {
      id: 6,
      text: "Gráficos estadísticos",
      color: "lightpink",
      idPadre: null,
      needConfigure: false,
      needLabels: false,
    },
    {
      id: 7,
      text: "Vulnerabilidades Encontradas",
      color: "lightgray",
      idPadre: null,
      needConfigure: false,
      needLabels: false,
    },
    {
      id: 8,
      text: "Detalle de las vulnerabilidades",
      color: "yellow",
      needConfigure: true,
      idPadre: null,
      needLabels: false,
    },
  ]);

  // Maneja la lógica cuando un elemento es soltado en la DropZone
  const handleDrop = (item) => {
    console.log(item);
    setDroppedItems((prev) => [...prev, item]);
  };

  // Maneja la acción de guardar los elementos de la DropZone
  const handleSave = () => {
    console.log("items: ", droppedItems);
  };

  return (
    <div style={style.container}>
      {/* Lado Izquierdo: DropZone */}
      <div style={style.dropZone}>
        <h3>Información seleccionada</h3>
        <DropZone
          droppedItems={droppedItems}
          setDroppedItems={setDroppedItems}
        />
        <div style={style.buttonContainer}>
          <button style={style.saveButton} onClick={handleSave}>
            Guardar
          </button>
          {/* Componente adicional para generar documentos */}
          <GenerateDocx />
        </div>
      </div>

      {/* Lado Derecho: DragItems */}
      <div style={style.dragItems}>
        <h3>Información base</h3>
        {cards.map((card) => {
          return (
            <DragItem
              key={card.id}
              id={card.id}
              text={card.text}
              color={card.color}
              needConfigure={card.needConfigure}
              needLabels={card.needLabels}
            />
          );
        })}
      </div>
    </div>
  );
};
