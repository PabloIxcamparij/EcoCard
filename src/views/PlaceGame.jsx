import React, { useEffect } from "react";
import Jokers from "../components/Jokers";
import { Button } from "@nextui-org/react";
import { useCardStore } from "../stores/useCardStore";

export default function PlaceGame() {

  const { cardsData, selectedCards, toggleCardId, selectRandomCards } =
    useCardStore((state) => ({
      cardsData: state.cardsData,
      selectedCards: state.selectedCards,
      toggleCardId: state.toggleCardId,
      selectRandomCards: state.selectRandomCards,
    }));

  useEffect(() => {
    selectRandomCards();
  }, [selectRandomCards]);

  console.log(selectedCards)

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-[#F2E8CF] p-3 overflow-auto text-white">
      
      <div className="flex justify-between w-full items-center p-5">
        <Jokers />
        <h1 className="text-danger font-bold text-xl">
          Puntaje objetivo: {2000}
        </h1>
      </div>

      <div className="flex flex-wrap justify-around items-center w-full gap-6">
        
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

        {/* Cartas seleccionadas */}
        <div className="h-2/4 w-full bg-custom-green-dark rounded-xl flex flex-wrap justify-around items-center gap-4 p-4 mb-5">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              onClick={() => toggleCardId(card)}
              className={`flex justify-center items-center w-20 h-32 rounded-lg transition-transform duration-200 ease-in-out ${
                selectedCards.includes(card)
                  ? "transform scale-110 shadow-lg"
                  : ""
              }`}
              style={{ backgroundColor: card.color }}
            >
              <span className="text-4xl font-bold">{card.valor}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
