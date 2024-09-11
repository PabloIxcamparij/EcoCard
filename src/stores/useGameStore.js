import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useCardStore } from "./useCardStore"; // Importar el useCardStore para acceder a los datos
import { useNotificationStore } from "./useNotificationStore"; // Para acceder al store de notificaciones

const calculateTotalScore = (cards) => {
  return cards.reduce((sum, card) => sum + card.puntaje, 0);
};

export const useGameStore = create(
  devtools(
    (set, get) => ({
      playAvailable: 3,
      discardAvailable: 3,
      goolScore: 200,
      gameWin: false,
      passPhase: false,

      // Función para descartar y obtener nuevas cartas aleatorias
      handleDiscardCards: (type) => {
        // Obtener los datos desde el useCardStore
        const { selectedCards, handCards, discardCards, changeCards } =
          useCardStore.getState();

        const { discardAvailable } = get();

        const { showNotification } = useNotificationStore.getState(); // Acceder al store de notificaciones

        if (selectedCards.length === 0) {
          showNotification({
            text: "No se ha seleccionado ninguna carta",
            error: true,
          });
          return;
        } else if (discardAvailable === 0 && type === 0) {
          showNotification({
            text: "No se cuenta con descartes",
            error: true,
          });
          return;
        }

        const remainingHandCards = handCards.filter(
          (card) => !selectedCards.includes(card)
        );

        const shuffledDiscardCards = [...discardCards].sort(
          () => 0.5 - Math.random()
        );
        const newCards = shuffledDiscardCards.slice(0, selectedCards.length);
        const updatedDiscardCards = discardCards.filter(
          (card) => !newCards.includes(card)
        );

        // Actualizar el estado con las nuevas cartas
        changeCards(remainingHandCards, newCards, updatedDiscardCards);

        if (type === 0) {
          set({
            discardAvailable: discardAvailable - 1,
          });
        }
      },

      // Función para jugar las cartas seleccionadas
      handlePlayCards: () => {
        const { selectedCards } = useCardStore.getState();
        const { playAvailable, goolScore } = get();
        const { showNotification } = useNotificationStore.getState();

        if (selectedCards.length === 0) {
          showNotification({
            text: "No se ha seleccionado ninguna carta",
            error: true,
          });
          return;
        }

        let typeScore = 0;
        const sortedCards = [...selectedCards].sort(
          (a, b) => a.valor - b.valor
        );

        const values = sortedCards.map((card) => card.valor);
        const colors = sortedCards.map((card) => card.color);
        const counts = {};
        values.forEach((value) => {
          counts[value] = (counts[value] || 0) + 1;
        });

        const countValues = Object.values(counts);

        // Calcular el puntaje total de las cartas seleccionadas
        const totalScore = calculateTotalScore(selectedCards);

        if (countValues.includes(2) && countValues.length === 1) {
          showNotification({
            text: "Par de cartas (One Pair): " + totalScore * 3,
            error: false,
          });
          typeScore = totalScore * 3;
        } else if (countValues.filter((count) => count === 2).length === 2) {
          showNotification({
            text: "Doble Par (Two Pair): " + totalScore * 4,
            error: false,
          });
          typeScore = totalScore * 4;
        } else if (
          countValues.includes(1) &&
          countValues.length === selectedCards.length
        ) {
          showNotification({
            text: "Carta Alta (High Card): " + totalScore * 2,
            error: false,
          });
          typeScore = totalScore * 2;
        } else if (countValues.includes(3) && countValues.length === 1) {
          showNotification({
            text: "3 de cartas iguales (Tree Card Same): " + totalScore * 5,
            error: false,
          });
          typeScore = totalScore * 5;
        } else if (new Set(colors).size === 1 && countValues.length === 3) {
          showNotification({
            text:
              "3 de cartas del mismo color (Tree Card Color): " +
              totalScore * 5,
            error: false,
          });
          typeScore = totalScore * 5;
        } else if (new Set(colors).size === 1 && countValues.length === 5) {
          showNotification({
            text:
              "5 de cartas del mismo color (Five Card Color): " +
              totalScore * 6,
            error: false,
          });
          typeScore = totalScore * 6;
        } else if (countValues.includes(3) && countValues.includes(2)) {
          showNotification({
            text:
              "Full House (2 cartas iguales y 3 cartas iguales): " +
              totalScore * 7,
            error: false,
          });
          typeScore = totalScore * 7;
        } else {
          showNotification({
            text: "No hay una combinación válida",
            error: true,
          });
        }

        set({
          playAvailable: playAvailable - 1,
          goolScore: goolScore - typeScore,
        });

        // Llama a la función de descartar cartas
        get().handleDiscardCards(1);
      },

    }),
    { name: "GameStore" }
  )
);
