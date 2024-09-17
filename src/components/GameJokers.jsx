import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Jokers } from "../json/Jokers.json";

export default function GameJokers() {
  const [selectedJoker, setSelectedJoker] = useState(null);

  // Función para seleccionar un joker de forma aleatoria
  const selectRandomJoker = () => {
    const randomIndex = Math.floor(Math.random() * Jokers.length);
    const randomJoker = Jokers[randomIndex];
    setSelectedJoker(randomJoker);
  };

  // Seleccionar un joker al cargar el componente
  useEffect(() => {
    selectRandomJoker();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Button
        className="w-full h-60"
        style={{ backgroundColor: selectedJoker?.color }}
        onClick={selectRandomJoker} // Cambia el joker cuando el botón se hace clic
      >
        {/* Mostrar detalles del joker seleccionado */}
        <div className="text-black text-center text-wrap">
          <h1 className="text-xl font-bold">{selectedJoker?.title}</h1>
          <p className="text-lg">{selectedJoker?.description}</p>
        </div>
      </Button>
    </div>
  );
}
