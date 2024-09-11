import React from 'react'
import { useCardStore } from "../stores/useCardStore";

function PlaceCards() {
    const {
        handCards,
        selectedCards,
        toggleCardId,
      } = useCardStore((state) => ({
        handCards: state.handCards,
        selectedCards: state.selectedCards,
        toggleCardId: state.toggleCardId,
      }));

  return (
    <div>
        {/* Cartas seleccionadas */}
        <div className="h-2/4 w-full bg-custom-gray rounded-xl flex flex-wrap justify-around items-center gap-4 p-4">
          {handCards.map((card) => (
            <div
              key={card.id}
              onClick={() => toggleCardId(card)}
              className={`flex justify-center items-center w-20 h-28 rounded-lg transition-transform duration-200 ease-in-out ${
                selectedCards.includes(card)
                  ? "transform scale-110 shadow-lg"
                  : ""
              } `}
              style={{ backgroundColor: card.color }}
            >
              <span className="text-4xl font-bold">{card.valor}</span>
            </div>
          ))}
        </div>

    </div>
  )
}

export default PlaceCards