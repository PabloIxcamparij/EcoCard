import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Cards } from "../Data/Card.json";

export const useCardStore = create(
  devtools(
    (set) => ({
      cardsData: Cards,
      selectedCards: [], // Nuevo estado para los IDs de las cartas seleccionadas

      // Acción para agregar o eliminar una carta seleccionada
      toggleCardId: (cardId) => set((state) => {
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
          .slice(0, 4);
        const selectedFromSecondHalf = secondHalf
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        const selected = [...selectedFromFirstHalf, ...selectedFromSecondHalf];
        return set({ cardsData: selected });
      },
    }),
    { name: "CardStore" } // Opcional, le da un nombre al store en DevTools
  )
);
