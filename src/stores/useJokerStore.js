import { create } from "zustand";
import { Jokers } from "../json/Jokers.json";
import { devtools } from "zustand/middleware";

export const useJokerStore = create(
  devtools(
    (set, get) => ({
      selecJoker: null,
      handJokers: [],
      deckJokers: Jokers,

      // Función para seleccionar un comodín aleatorio
      selectRandomCards: () => {
        const { handJokers, deckJokers } = get();

        const randomIndex = Math.floor(Math.random() * deckJokers.length);
        const randomJoker = deckJokers[randomIndex];

        handJokers.push(randomJoker);

        const updatedDeckJokers = deckJokers.filter(
          (_, index) => index !== randomIndex
        );

        set({
          selecJoker: randomJoker,
          handJokers: [...handJokers],
          deckJokers: updatedDeckJokers,
        });
      },

      restartJokers: () => {
        set({
          selecJoker: null,
          handJokers: [],
          deckJokers: Jokers,
        });
      },
      
    }),
    { name: "Joker" }
  )
);
