import { create } from "zustand";
import { Jokers } from "../json/Jokers.json";
import { devtools } from "zustand/middleware";

export const useJokerStore = create(
  devtools(
    (set, get) => ({
      selecJoker: null,
      handJokers: [], // Aquí se almacenan los comodines que el jugador ha obtenido
      deckJokers: Jokers, // Inicialmente contiene todos los comodines disponibles

      // Función para seleccionar un comodín aleatorio
      selectRandomCards: () => {
        const { handJokers, deckJokers } = get();
        
        // Seleccionar un comodín aleatorio del mazo
        const randomIndex = Math.floor(Math.random() * deckJokers.length);
        const randomJoker = deckJokers[randomIndex];
        
        // Añadir el comodín seleccionado a la mano
        handJokers.push(randomJoker);

        // Eliminar el comodín seleccionado del mazo
        const updatedDeckJokers = deckJokers.filter((_, index) => index !== randomIndex);

        // Actualizar el estado
        set({
          selecJoker: randomJoker,   // Comodín seleccionado
          handJokers: [...handJokers], // Mano actualizada con el nuevo comodín
          deckJokers: updatedDeckJokers, // Mazo actualizado sin el comodín seleccionado
        });

        console.log("Mano de comodines:", handJokers);
        console.log("Mazo restante:", updatedDeckJokers);
      },
    }),
    { name: "Joker" }
  )
);
