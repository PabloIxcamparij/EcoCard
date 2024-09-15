import React from "react";
import { Howl } from "howler";
import { useCardStore } from "../stores/useCardStore";

export default function PlaceCards() {
  const { handCards, selectedCards, toggleCardId } = useCardStore((state) => ({
    handCards: state.handCards,
    selectedCards: state.selectedCards,
    toggleCardId: state.toggleCardId,
  }));

  // Sound for activating and deactivating cards
  const activationSound = new Howl({
    src: ["/public/Effect-Card-Start.mp3"],
    volume: 0.5,
  });

  const deactivationSound = new Howl({
    src: ["/public/Effect-Card-End.mp3"],
    volume: 2.0,
  });

  return (
    <div>
      {/* Cartas seleccionadas */}
      <div className="h-2/4 w-full bg-custom-gray rounded-xl flex flex-wrap justify-around items-center gap-4 p-4">
        {handCards.map((card) => (
          <div
            key={card.id}
            onClick={() => {
              const isCardSelected = selectedCards.includes(card);
              
              toggleCardId(card); // Toggle card selection

              if (isCardSelected) {
                deactivationSound.play(); // Play deactivation sound
              } else {
                activationSound.play(); // Play activation sound
              }
            }}
            className={`flex justify-center items-center w-20 h-28 rounded-lg transition-transform duration-200 ease-in-out ${
              selectedCards.includes(card)
                ? "transform scale-110 shadow-lg border-4 border-custom-white"
                : ""
            } `}
            style={{ backgroundColor: card.color }}
          >
            <span className="text-4xl font-bold">{card.valor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}