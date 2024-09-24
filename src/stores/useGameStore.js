import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useCardStore } from "./useCardStore";
import { useLevelLimity } from "./useLevelLimity";
import { useNotificationStore } from "./useNotificationStore";
import { useJokerStore } from "./useJokerStore";

const calculateTotalScore = (cards) => {
  return cards.reduce((sum, card) => sum + card.puntaje, 0);
};

const nevels = [300, 350, 400, 500, 550, 600, 700, 750, 800, 900, 950, 1000, 1100, 1150, 1200];

const levelTriggers = {
  joker: [1, 3, 5, 7, 9, 11],
  hardLevel: [4, 8, 13],
};

export const useGameStore = create(
  devtools(
    (set, get) => ({
      numberPlays: 3,
      numberdiscards: 3,
      playAvailable: 3,
      discardAvailable: 3,
      nevelsGoal: nevels,
      currentLevel: 0,
      goalScore: 200,
      handScore: 0,
      handType: "",
      finalScore: 0,
      savedMatchWinsScores: [],
      savedMatchLotScores: [],

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
        const { handLimity } = useLevelLimity.getState();
        const { selectedCards } = useCardStore.getState();
        const { showNotification } = useNotificationStore.getState();
        const { playAvailable, goalScore, finalScore, setHand } = get();

        if (selectedCards.length === 0) {
          if (type === 0) {
            showNotification({
              text: "No se ha seleccionado ninguna carta",
              error: true,
            });
          }

          setHand(0, "---");
          return;
        }

        if (handLimity !== null) {
          const limitType = handLimity.type;

          // Filtrar selectedCards para quitar cartas que tengan el mismo tipo que limitType
          const filteredCards = selectedCards.filter(
            (card) => card.tipo !== limitType
          );

          // Llamar a la función con el nuevo array filtrado
          get().calculatehands(filteredCards);
        } else {
          // Llamar la funcion para calcular el selector de cartas
          get().calculatehands(selectedCards);
        }

        // Si se trata de una jugada se debe de realizar los siguientes cambios

        if (type === 0) {
          const bonus = get().calculateBonus();

          set({
            goalScore: goalScore - bonus,
            playAvailable: playAvailable - 1,
            finalScore: finalScore + bonus,
          });

          get().handleDiscardCards(1);
        }
      },

      // Funcion para calcular el valor de las manos jugadas
      calculatehands: (cards) => {
        const { setHand } = get();

        let typeScore = 0;

        const sortedCards = [...cards].sort((a, b) => a.valor - b.valor);

        const values = sortedCards.map((card) => card.valor);
        const colors = sortedCards.map((card) => card.color);
        const counts = {};

        values.forEach((value) => {
          counts[value] = (counts[value] || 0) + 1;
        });

        const countValues = Object.values(counts);

        // Calcular el puntaje total de las cartas seleccionadas
        const totalScore = calculateTotalScore(cards);

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
        } else if (new Set(colors).size === 1 && cards.length === 5) {
          typeScore = totalScore * 6;

          setHand(typeScore, "Cinco colores");
        } else if (countValues.includes(3) && countValues.includes(2)) {
          typeScore = totalScore * 7;

          setHand(typeScore, "Casa llena");
        } else if (
          countValues.includes(1) &&
          countValues.length === cards.length
        ) {
          typeScore = totalScore * 2;

          setHand(typeScore, "Carta alta");
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
        const { handType } = get(); // Obtener el tipo de mano jugada
        const { handJokers } = useJokerStore.getState();
        const { selectedCards } = useCardStore.getState();
        const { showNotification } = useNotificationStore.getState();

        let bonus = 0; // Inicializamos el bono en 0
        let multiplier = 1; // Multiplicador por defecto

        if (handJokers.length > 0) {

          // Filtrar los Jokers en dos grupos: no-card y card
          const nonCardJokers = handJokers.filter(
            (joker) => joker.bonusType !== "card"
          );

          const cardJokers = handJokers.filter(
            (joker) => joker.bonusType === "card"
          );

          // Procesar primero los Jokers que no son de tipo "card"
          [...nonCardJokers, ...cardJokers].forEach((joker) => {

            // Verificar el bonus basado en combinación de cartas (nuevo)
            if (joker.bonusType === "combination") {
              const hasType1 = selectedCards.some(
                (card) => card.tipo === joker.type
              );
              const hasType2 = selectedCards.some(
                (card) => card.tipo === joker.type2
              );

              if (hasType1 && hasType2) {
                bonus += 100; // Añadir el bonus de 100 puntos
                showNotification({
                  text: "¡Bonus 100p",
                  error: false,
                });
              }
            }

            // Verificar si el Joker aplica para dos cartas del mismo tipo
            const cardsOfSameType = selectedCards.filter(
              (card) => card.tipo === joker.type
            );

            if (
              joker.bonusType === "twoSameType" &&
              cardsOfSameType.length >= 2
            ) {
              bonus += 80;
              showNotification({
                text: "¡Bonus 80p!",
                error: false,
              });
            }

            // Verificar si todas las cartas son del mismo tipo
            if (
              joker.bonusType === "allSameType" &&
              cardsOfSameType.length === selectedCards.length
            ) {
              bonus += 120;
              showNotification({
                text:"¡Bonus 120p!",
                error: false,
              });
            }

            // Bonos basados en el tipo de mano jugada (solo tipo "card")
            if (joker.bonusType === "card") {
              switch (joker.type) {
                case "Par":
                  if (handType === "Par") {
                    multiplier = joker.multiplier;
                  }
                  break;

                case "Doble Par":
                  if (handType === "Doble Par") {
                    multiplier = joker.multiplier;
                  }
                  break;

                case "Trio de valores":
                  if (handType === "Trio de valores") {
                    multiplier = joker.multiplier;
                  }
                  break;

                case "Trio de colores":
                  if (handType === "Trio de colores") {
                    multiplier = joker.multiplier;
                  }
                  break;

                case "Cinco colores":
                  if (handType === "Cinco colores") {
                    multiplier = joker.multiplier;
                  }
                  break;

                case "Casa Llena":
                  if (handType === "Casa Llena") {
                    multiplier = joker.multiplier;
                  }
                  break;

                default:
                  break;
              }

            }
          });
        }

        // Aplicar el multiplicador a los puntos de la mano
        const finalBonus = (get().handScore + bonus) * multiplier;

        return finalBonus; // Devolver el bonus calculado
      },

      // Funcion para sumar a las manos un +1 de acuedo a que tipo se escoga
      plusHand: (type) => {
        if (type === 0) {
          set({
            numberPlays: get().numberPlays + 1,
          });
        } else {
          set({
            numberdiscards: get().numberdiscards + 1,
          });
        }
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

      restarScores: () => {
        // Borra las puntuaciones almacenadas en localStorage
        localStorage.removeItem("winsScore");
        localStorage.removeItem("lostScore");
      
        // Restablece los estados locales a listas vacías
        set({
          savedMatchWinsScores: [],
          savedMatchLotScores: [],
        });
      },
      
      // Hace que se resetee varios elementos y cambiar la puntuación objetivo
      nextLevel: () => {
        const { nevelsGoal, currentLevel } = get();
        const { restartLimity } = useLevelLimity.getState();
        const { restartGameCards } = useCardStore.getState();
        const {
          showModalGameJokers,
          showModalGameNotification,
          showModalGameHardLevel,
        } = useNotificationStore.getState();

        // Reiniar la limitacion para limpiar el campo de juego
        restartLimity();

        // Reiniciar cartas y cambiar el puntaje objetivo
        restartGameCards();

        if (levelTriggers.joker.includes(currentLevel)) {
          showModalGameJokers();
        } else if (levelTriggers.hardLevel.includes(currentLevel)) {
          showModalGameHardLevel();
        } else if (currentLevel === 14) {
          showModalGameNotification("Ganado, felicidades! Gracias por jugar");

          get().saveScore(0);
          get().restartGame();
          return;
        }else{
          showModalGameNotification("Pasado de nivel");
        }

        // Verificar periódicamente si showModalJoker es false
        const checkModalStatus = setInterval(() => {
          const { showModalJoker: updatedShowModalJoker } =
            useNotificationStore.getState();

          // Si el modal ya no está activo, continuar con la ejecución
          if (!updatedShowModalJoker) {
            // Detener el intervalo
            clearInterval(checkModalStatus);

            set({
              goalScore: nevelsGoal[currentLevel],
              discardAvailable: get().numberdiscards,
              playAvailable: get().numberPlays,
              currentLevel: currentLevel + 1,
            });
          }
        }, 50);
      },

      // Resetea el juego a sus valores origniales
      restartGame: () => {
        const { restartLimity } = useLevelLimity.getState();
        restartLimity();

        const { restartGameCards } = useCardStore.getState();
        restartGameCards();

        const { restartJokers } = useJokerStore.getState();
        restartJokers();

        set({
          goalScore: 200,
          discardAvailable: 3,
          playAvailable: 3,
          currentLevel: 0,
          numberPlays: 3,
          numberdiscards: 3,
        });
      },
    }),
    { name: "GameStore" }
  )
);
