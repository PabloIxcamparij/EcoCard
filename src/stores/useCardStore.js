import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Cards } from "../json/Card.json";

export const useCardStore = create(
  devtools(
    (set, get) => ({
      cardsData: Cards,
      handCards: [],
      selectedCards: [],
      discardCards: [],

      // Acción para agregar o eliminar una carta seleccionada
      toggleCardId: (cardId) =>
        set((state) => {
          const isSelected = state.selectedCards.includes(cardId);

          return {
            selectedCards: isSelected
              ? state.selectedCards.filter((id) => id !== cardId)
              : state.selectedCards.length < 5
              ? [...state.selectedCards, cardId]
              : state.selectedCards,
          };
        }),

      // Función para seleccionar 9 cartas aleatorias
      selectRandomCards: () => {
        const shuffledCards = [...Cards].sort(() => 0.5 - Math.random());
        const half = Math.ceil(shuffledCards.length / 2);
        const firstHalf = shuffledCards.slice(0, half);
        const secondHalf = shuffledCards.slice(half);

        const selectedFromFirstHalf = firstHalf
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        const selectedFromSecondHalf = secondHalf
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        const selected = [...selectedFromFirstHalf, ...selectedFromSecondHalf];

        set({
          handCards: selected,

          // Actualiza discardCards excluyendo las cartas en handCards
          discardCards: Cards.filter((card) => !selected.includes(card)),
        });
      },

      // Función para cambiar las cartas en el estado
      changeCards: (remainingHandCards, newCards, updatedDiscardCards) => {
        set({
          handCards: [...remainingHandCards, ...newCards],
          discardCards: updatedDiscardCards,
          selectedCards: [], // Resetear las cartas seleccionadas
        });
      },
      
    }),
    { name: "CardStore" }
  )
);
