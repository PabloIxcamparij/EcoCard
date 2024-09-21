import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useCardStore } from "./useCardStore"; // Importar el useCardStore para acceder a los datos
import { useNotificationStore } from "./useNotificationStore"; // Para acceder al store de notificaciones
import { useJokerStore } from "./useJokerStore";

const calculateTotalScore = (cards) => {
  return cards.reduce((sum, card) => sum + card.puntaje, 0);
};

export const useGameStore = create(
  devtools(
    (set, get) => ({
      playAvailable: 3,
      discardAvailable: 3,
      nevelsGoal: [
        300, 350, 500, 700, 800, 1000, 1050, 1200, 1400, 1500, 1600, 1650, 1800,
        2000,
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
      // El type es para saber si es un descarte o es una jugada
      handleDiscardCards: (type) => {
        const { discardAvailable } = get();
        const { showNotification } = useNotificationStore.getState();
        const { selectedCards, handCards, deckCards, changeCards } =
          useCardStore.getState();

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

        const shuffledDeckCards = [...deckCards].sort(
          () => 0.5 - Math.random()
        );
        const newCards = shuffledDeckCards.slice(0, selectedCards.length);
        const updatedDeckCards = deckCards.filter(
          (card) => !newCards.includes(card)
        );

        // Actualizar el estado con las nuevas cartas
        changeCards(remainingHandCards, newCards, updatedDeckCards);

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
        const { playAvailable, goalScore, finalScore, handScore, setHand } =
          get();

        if (selectedCards.length === 0) {
          if (type === 0) {
            showNotification({
              text: "No se ha seleccionado ninguna carta",
              error: true,
            });
          }

          setHand(0, "---")
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

          setHand(typeScore, "Par");
        } else if (countValues.filter((count) => count === 2).length === 2) {
          typeScore = totalScore * 4;

          setHand(typeScore, "Doble Par");
        } else if (countValues.includes(3) && countValues.length === 1) {
          typeScore = totalScore * 5;

          setHand(typeScore, "Trio de valores");
        } else if (new Set(colors).size === 1 && countValues.length === 3) {
          typeScore = totalScore * 5;

          setHand(typeScore, "Trio de colores");
        } else if (new Set(colors).size === 1 && selectedCards.length === 5) {
          typeScore = totalScore * 6;

          setHand(typeScore, "Cinco colores");
        } else if (countValues.includes(3) && countValues.includes(2)) {
          typeScore = totalScore * 7;

          setHand(typeScore, "Casa Llena");
        } else if (
          countValues.includes(1) &&
          countValues.length === selectedCards.length
        ) {
          typeScore = totalScore * 2;

          setHand(typeScore, "Carta alta");
        }

        if (type === 0) {

          const bonus = get().calculateBonus();

          set({
            goalScore: goalScore -(handScore + bonus),
            playAvailable: playAvailable - 1,
            finalScore: finalScore + (handScore + bonus),
            handScore: 0,
          });

          get().handleDiscardCards(1);
        }
      },

      // Función para setear las cartas seleccionadas
      setHand: (score, hand) => {
        set({
          handScore: score,
          handType: hand,
        });
      },

      // Función para calcular el bonus por las cartas seleccionadas
      calculateBonus: () => {
        const { handJokers } = useJokerStore.getState();
        const { selectedCards } = useCardStore.getState();
        const { showNotification } = useNotificationStore.getState();
        let bonus = 0; // Inicializamos el bono en 0
      
        // Verificar si hay algún Joker que aplique el bonus
        if (handJokers.length > 0) {
          handJokers.forEach((joker) => {
            // Verificar si el Joker aplica para el tipo de cartas jugadas
            const cardsOfSameType = selectedCards.filter(
              (card) => card.tipo === joker.type
            );
      
            if (
              joker.bonusType === "twoSameType" &&
              cardsOfSameType.length >= 2
            ) {
              // Si el Joker es de tipo 'twoSameType' y hay al menos 2 cartas del mismo tipo
              showNotification({
                text: `¡Bonus 50p por ${joker.title}!`,
                error: false,
              });
              bonus = 50; // Aplicamos el bono de 50
            }
      
            if (
              joker.bonusType === "allSameType" &&
              cardsOfSameType.length === selectedCards.length
            ) {
              showNotification({
                text: `¡Bonus 100p por ${joker.title}!`,
                error: false,
              });
              bonus = 100; // Aplicamos el bono de 100
            }
          });
        }
      
        return bonus; // Devolver el bono (0 si no aplica ninguno)
      },
      
      // Salva en localStore las puntuaciones
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

      // Carga de localStore las puntuaciones
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

      // Hace que se resetee varios elementos y cambiar la puntuacion objetivo
      nextLevel: () => {
        const { nevelsGoal, currentLevel } = get();
        const { restartGameCards } = useCardStore.getState();
        const { showModalGameJokers, showModalGameNotification} = useNotificationStore.getState();
        restartGameCards();

        set({
          goalScore: nevelsGoal[currentLevel],
          discardAvailable: 3,
          playAvailable: 3,
          currentLevel: currentLevel + 1,
        });
        // 1, 4, 7
        if ([0, 2, 7, 9, 10].includes(currentLevel)) {
          showModalGameJokers();
        } else{
          showModalGameNotification("Pasado de nivel");
        }
      },

      // Resetea el juego a sus valores origniales
      restartGame: () => {
        const { restartGameCards } = useCardStore.getState();
        restartGameCards();

        const { restartJokers } = useJokerStore.getState();
        restartJokers();

        set({
          goalScore: 200,
          discardAvailable: 3,
          playAvailable: 3,
          currentLevel: 0,
        });
      },
    }),
    { name: "GameStore" }
  )
);
