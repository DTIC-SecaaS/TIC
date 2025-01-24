import React, { useState } from "react";
import { DropZone } from "./DropZone";
import { DragItem } from "./DragItem";

const style = {
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  dropZone: {
    flex: 3,
    padding: "5px 20px 5px 20px",
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

export const TipoVulnerabilidades = ({ hideSourceOnDrag }) => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Vulnerabilidades Criticas",
      color: "lightcoral",
      idPadre: null,
      needConfigure: true,
      needLabels: true,
    },
    {
      id: 2,
      text: "Vulnerabilidades Altas",
      color: "lightgreen",
      idPadre: null,
      needConfigure: true,
      needLabels: true,
    },
    {
      id: 3,
      text: "Vulnerabilidades Moderadas",
      color: "lightblue",
      idPadre: null,
      needConfigure: true,
      needLabels: true,
    },
    {
      id: 4,
      text: "Vulnerabilidades Bajas",
      color: "lightgoldenrodyellow",
      idPadre: null,
      needConfigure: true,
      needLabels: true,
    },
    {
      id: 5,
      text: "Vulnerabilidades Informativas",
      color: "lightsalmon",
      idPadre: null,
      needConfigure: true,
      needLabels: true,
    },
  ]);

  const handleDrop = (item) => {
    console.log(item);
    setDroppedItems((prev) => [...prev, item]);
  };

  const handleSave = () => {
    console.log("items: ", droppedItems);
  };

  return (
    <div style={style.container}>
      {/* Lado Izquierdo: DropZone */}
      <div style={style.dropZone}>
        <h3>DropZone</h3>
        {/* <DropZone onDrop={handleDrop} /> */}
        <DropZone
          droppedItems={droppedItems}
          setDroppedItems={setDroppedItems}
        />
        {/* <ul>
          {droppedItems.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul> */}
        <div style={style.buttonContainer}>
          <button style={style.saveButton} onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>

      {/* Lado Derecho: DragItems */}
      <div style={style.dragItems}>
        <h3>Drag Items</h3>
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
