import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Cards } from "../data/Card.json";

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

      // Función para descartar y obtener nuevas cartas aleatorias
      handleDiscardCards: () => {
        const { selectedCards, handCards, discardCards, showNotification } =
          get();

        if (selectedCards.length === 0) {
          showNotification({
            text: "No se ha seleccionado ninguna carta",
            error: true,
          });
          return;
        }

        const remainingHandCards = handCards.filter(
          (card) => !selectedCards.includes(card)
        );

        console.log(remainingHandCards);

        // Seleccionar nuevas cartas aleatorias de discardCards
        const shuffledDiscardCards = [...discardCards].sort(
          () => 0.5 - Math.random()
        );

        const newCards = shuffledDiscardCards.slice(0, selectedCards.length);

        // Excluir las cartas seleccionadas
        const updatedDiscardCards = discardCards.filter(
          (card) => !newCards.includes(card)
        );

        // Actualizar el estado con las nuevas cartas
        set({
          handCards: [...remainingHandCards, ...newCards],
          discardCards: updatedDiscardCards,
          selectedCards: [],
        });
      },

      // Función para comprobar que valor tiene la mano juagada
      handlePlayCards: () => {
        const { selectedCards, handleDiscardCards, showNotification } = get();

        if (selectedCards.length === 0) {
          showNotification({
            text: "No se ha seleccionado ninguna carta",
            error: true,
          });
          return;
        }

        // Ordenar cartas por valor
        const sortedCards = [...selectedCards].sort(
          (a, b) => a.valor - b.valor
        );

        // Obtener solo los valores de las cartas
        const values = sortedCards.map((card) => card.valor);

        const counts = {};
        values.forEach((value) => {
          counts[value] = (counts[value] || 0) + 1;
        });

        const countValues = Object.values(counts);

        // Verificar las combinaciones

        // Si hay una pareja y solo una combinación
        if (countValues.includes(2) && countValues.length === 1) {
          showNotification({
            text: "Pareja (One Pair): 20",
            error: false,
          });
        }

        // Si hay dos parejas
        else if (countValues.filter((count) => count === 2).length === 2) {
          showNotification({
            text: "Doble Pareja (Two Pair): 30",
            error: false,
          });
        }

        // Ninguna combinación
        else if (
          countValues.includes(1) &&
          countValues.length === selectedCards.length
        ) {
          showNotification({
            text: "Carta Alta (High Card): 10",
            error: false,
          });
        }

        // Mensaje de error
        else {
          showNotification({
            text: "No hay una combinación válida",
            error: true,
          });
        }

        // Se llama al descarte de cartas para eliminar las cartas jugadas
        handleDiscardCards();
      },

      // Funciones para mostrar la notificacion
      notificacion: {
        text: "",
        error: false,
        show: false,
      },

      showNotification: (payload) => {
        set({
          notificacion: {
            text: payload.text,
            error: payload.error,
            show: true,
          },
        });
        setTimeout(() => {
          get().hideNotification();
        }, 3000);
      },

      hideNotification: () => {
        set({
          notificacion: {
            show: false,
          },
        });
      },
    }),
    { name: "CardStore" }
  )
);
