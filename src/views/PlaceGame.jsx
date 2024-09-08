import React, { useEffect, useState } from "react";
import { Cards } from "../Data/Card.json";
import Jokers from "../components/Jokers";
import { Button } from "@nextui-org/react";

export default function PlaceGame() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [activeCards, setActiveCards] = useState([]);

  // Función para seleccionar 9 cartas aleatorias
  const selectRandomCards = () => {
    // Barajar las cartas
    const shuffledCards = [...Cards].sort(() => 0.5 - Math.random());

    // Dividir el mazo en dos mitades
    const half = Math.ceil(shuffledCards.length / 2);
    const firstHalf = shuffledCards.slice(0, half);
    const secondHalf = shuffledCards.slice(half);

    // Seleccionar aleatoriamente 5 de la primera mitad y 4 de la segunda
    const selectedFromFirstHalf = firstHalf
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    const selectedFromSecondHalf = secondHalf
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    // Combinar las cartas seleccionadas
    const selected = [...selectedFromFirstHalf, ...selectedFromSecondHalf];

    setSelectedCards(selected);
  };

  // Ejecutar cuando el componente se monta
  useEffect(() => {
    selectRandomCards();
  }, []);

  // Función para activar/desactivar el estado de la carta seleccionada
  const toggleCard = (index) => {
    setActiveCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col justify-around items-center w-screen h-screen bg-[#F2E8CF] p-3 overflow-hidden text-white">
      
      <div className="flex justify-between w-full items-center">
        <Jokers />
        <div>
          <h1 className="text-danger font-bold text-xl">Puntaje objetivo</h1>
        </div>
      </div>

      <div className="flex justify-around items-center w-full gap-4">
        <Button
          className="rounded-full w-2/5 font-bold text-xl"
          color="danger"
          variant="ghost"
        >
          Descartar
        </Button>
        <Button
          className="rounded-full w-2/5 font-bold text-xl"
          color="success"
          variant="ghost"
        >
          Jugar
        </Button>
      </div>

      {/* Cartas seleccionadas */}
      <div className="h-2/4 w-full bg-custom-green-dark rounded-xl flex flex-wrap justify-around items-center gap-2 p-2">
        {selectedCards.map((card, index) => (
          <div
            key={index}
            onClick={() => toggleCard(index)}
            className={`flex justify-center items-center w-20 h-32 rounded-lg transition-transform duration-200 ease-in-out ${
              activeCards.includes(index) ? "transform scale-110 shadow-lg" : ""
            }`}
            style={{ backgroundColor: card.color }}
          >
            <span className="text-4xl font-bold">{card.valor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
