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
        const {deckJokers } = get();

        const randomIndex = Math.floor(Math.random() * deckJokers.length);
        const randomJoker = deckJokers[randomIndex];

        const updatedDeckJokers = deckJokers.filter(
          (_, index) => index !== randomIndex
        );

        set({
          selecJoker: randomJoker,
          deckJokers: updatedDeckJokers,
        });
      },

      selectJoker: () => {
        const { selecJoker, handJokers } = get();

        set({
          handJokers: [...handJokers, selecJoker]
        })
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
