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
      nevelsGoal:[
        300, 350, 500, 700,
        800, 1000, 1050, 1200, 1400,
        1500, 1600, 1650, 1800, 2000
      ], //All nevels of the game
      currentLevel: 0, //Current position in the game
      goalScore: 200, //First level is 200
      handScore: 0,
      finalScore: 0,
      savedMatchWinsScores: [],
      savedMatchLotScores: [],
      handType: "",
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
      handlePlayCards: (type) => {
        
        const { selectedCards } = useCardStore.getState();
        const { showNotification } = useNotificationStore.getState();
        const { playAvailable, goalScore, finalScore } = get();

        if (selectedCards.length === 0) {
          if (type === 0) {
            showNotification({
              text: "No se ha seleccionado ninguna carta",
              error: true,
            });
          }

          set({
            handScore: 0,
            handType: "---",
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
          typeScore = totalScore * 3;

          set({
            handScore: typeScore,
            handType: "Par",
          });
        } else if (countValues.filter((count) => count === 2).length === 2) {
          typeScore = totalScore * 4;

          set({
            handScore: typeScore,
            handType: "2 Par",
          });
        } else if (countValues.includes(3) && countValues.length === 1) {
          typeScore = totalScore * 5;

          set({
            handScore: typeScore,
            handType: "3 valores",
          });
        } else if (new Set(colors).size === 1 && countValues.length === 3) {
          typeScore = totalScore * 5;

          set({
            handScore: typeScore,
            handType: "3 colores",
          });
        } else if (new Set(colors).size === 1 && selectedCards.length === 5) {
          // Verifica si todas las cartas tienen el mismo color para 5 colores
          typeScore = totalScore * 6;

          set({
            handScore: typeScore,
            handType: "5 colores",
          });
        } else if (countValues.includes(3) && countValues.includes(2)) {
          typeScore = totalScore * 7;

          set({
            handScore: typeScore,
            handType: "Full House ",
          });
        } else if (
          countValues.includes(1) &&
          countValues.length === selectedCards.length
        ) {
          typeScore = totalScore * 2;

          set({
            handScore: typeScore,
            handType: "Carta alta",
          });
        }

        if (type === 0) {
          set({
            goalScore: goalScore - typeScore,
            playAvailable: playAvailable - 1,
            finalScore: finalScore + typeScore, // Acumular el nuevo puntaje
          });

          get().handleDiscardCards(1);
        }
      },

      saveScore: (type) => {
        const { finalScore } = get();

        if (type === 0) {
          const scores = JSON.parse(localStorage.getItem("winsScore")) || [];
          scores.push(finalScore);
          localStorage.setItem("winsScore", JSON.stringify(scores));
        } else {
          const scores = JSON.parse(localStorage.getItem("lostScore")) || [];
          scores.push(finalScore);
          localStorage.setItem("lostScore", JSON.stringify(scores));
        }
      },

      loadScore: () => {
        const savedWinsScores =
          JSON.parse(localStorage.getItem("winsScore")) || [];
        const savedLostScores =
          JSON.parse(localStorage.getItem("lostScore")) || [];

        set({
          savedMatchWinsScores: savedWinsScores,
          savedMatchLotScores: savedLostScores,
        });
      },

      nextGame: () =>{
        const { nevelsGoal, currentLevel } = get();

        set({
          goalScore: nevelsGoal[currentLevel],
          discardAvailable: 3,
          playAvailable: 3,
          currentLevel: currentLevel + 1,
        })
        
      },

      restarGame: () => {

        set({
          goalScore: 200,
          discardAvailable: 3,
          playAvailable: 3,
          currentLevel: 0,
        })
      }

    }),
    { name: "GameStore" }
  )
);
