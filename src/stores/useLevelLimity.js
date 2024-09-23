import { create } from "zustand";
import { Limity } from "../json/Limity.json";
import { devtools } from "zustand/middleware";

export const useLevelLimity = create(
  devtools(
    (set, get) => ({
      handLimity: null,

      // Función para seleccionar un límite aleatorio
      selectRandomLimity: () => {
        const randomIndex = Math.floor(Math.random() * Limity.length);
        const randomLimity = Limity[randomIndex];

        set({
          handLimity: randomLimity,
        });
      },

      // Reiniciar handLimity a null
      restartLimity: () => {
        set({
          handLimity: null,
        });
      },
      
    }),
    { name: "Level Limity" }
  )
);
