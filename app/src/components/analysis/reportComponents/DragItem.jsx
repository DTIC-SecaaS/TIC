/**
 * Componente DragItem
 *
 * Este componente representa un elemento que puede ser arrastrado en un contexto de React-DnD.
 * Cada instancia del componente contiene información específica y comportamientos configurables.
 *
 * Props:
 * - id (string): Identificador único del elemento.
 * - text (string): Texto que describe el contenido del elemento.
 * - color (string): Color de fondo del elemento.
 * - needConfigure (boolean): Indica si el elemento requiere configuración adicional.
 * - needLabels (boolean): Indica si el elemento necesita etiquetas asociadas.
 * - needImage (boolean): Indica si el elemento requiere una imagen asociada.
 */

import React from "react";
import { useDrag } from "react-dnd";

export const DragItem = ({
  id,
  text,
  color,
  needConfigure,
  needLabels,
  needImage,
}) => {
  // Configuración del hook useDrag para habilitar la funcionalidad de arrastrar
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item", // Define el tipo de elemento para React-DnD
    item: { id, text, color, needConfigure, needLabels, needImage }, // Información que se transmite al arrastrar
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Indica si el elemento está siendo arrastrado
    }),
  }));

  return (
    <div
      ref={drag} // Referencia asignada al elemento para habilitar el arrastre
      style={{
        opacity: isDragging ? 0.5 : 1, // Cambia la opacidad cuando el elemento es arrastrado
        cursor: "move", // Estilo del cursor para indicar que el elemento es arrastrable
        border: "1px solid #ccc", // Borde del contenedor
        padding: "10px", // Espaciado interno
        borderRadius: "5px", // Bordes redondeados
        margin: "5px", // Margen externo
        backgroundColor: color, // Color de fondo personalizado
      }}
    >
      {text} {/* Muestra el texto del elemento */}
    </div>
  );
};
