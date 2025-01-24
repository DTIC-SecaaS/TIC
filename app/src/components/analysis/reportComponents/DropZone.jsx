/**
 * Componente DropZone
 *
 * Este componente permite a los usuarios arrastrar y soltar elementos (drag-and-drop) en una zona de destino.
 * Además, permite reorganizar y eliminar elementos dentro de la zona de destino.
 *
 * Props:
 * - droppedItems (Array): Lista de elementos que se han soltado en la zona de destino.
 * - setDroppedItems (Function): Función para actualizar el estado de los elementos soltados.
 */

import React, { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { Card } from "./Card";

export const DropZone = ({ droppedItems, setDroppedItems }) => {
  // Configuración del hook useDrop para manejar la funcionalidad de arrastrar y soltar
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item", // Define el tipo de elemento que este componente acepta
    drop: (item) => {
      // Función que se ejecuta cuando se suelta un elemento
      setDroppedItems((prevItems) => [...prevItems, item]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(), // Verifica si un elemento se encuentra sobre la zona de destino
    }),
  }));

  /**
   * Mueve una tarjeta dentro de la zona de destino.
   *
   * @param {number} dragIndex - Índice del elemento que se está arrastrando.
   * @param {number} hoverIndex - Índice del elemento sobre el cual se suelta el arrastrado.
   */
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setDroppedItems((prevItems) =>
      update(prevItems, {
        $splice: [
          [dragIndex, 1], // Elimina el elemento en dragIndex
          [hoverIndex, 0, prevItems[dragIndex]], // Inserta el elemento en hoverIndex
        ],
      })
    );
  }, []);

  /**
   * Elimina una tarjeta de la zona de destino.
   *
   * @param {number} index - Índice del elemento a eliminar.
   */
  const deleteCard = (index) => {
    setDroppedItems((prevItems) =>
      prevItems.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  return (
    <div
      ref={drop} // Referencia asignada al contenedor para habilitar la funcionalidad de arrastrar y soltar
      style={{
        border: `1px dashed ${isOver ? "green" : "black"}`,
        padding: "10px",
        height: "400px",
        position: "relative",
        overflowY: "auto",
      }}
    >
      {droppedItems.length === 0 && (
        <p style={{ textAlign: "center", color: "#888" }}>Drop items here</p>
      )}
      {droppedItems.map((item, index) => (
        <Card
          key={index} // Clave única para cada tarjeta
          index={index} // Índice de la tarjeta
          id={item.id} // Identificador único del elemento
          text={item.text} // Texto asociado al elemento
          moveCard={moveCard} // Función para mover la tarjeta
          onDelete={() => deleteCard(index)} // Función para eliminar la tarjeta
          color={item.color} // Color de la tarjeta
          needConfigure={item.needConfigure} // Indica si la tarjeta necesita configuración
          needLabels={item.needLabels} // Indica si la tarjeta necesita etiquetas
          needImage={item.needImage} // Indica si la tarjeta necesita imagen
        />
      ))}
    </div>
  );
};
