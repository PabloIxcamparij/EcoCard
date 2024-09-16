import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useNotificationStore = create(
  devtools(
    (set, get) => ({
      // Estado de notificación
      notificacion: {
        text: "",
        error: false,
        show: false,
      },

      // Estado del modal
      showModal: false,
      message: "",

      // Estado del modal Jokers
      showModalJokers: false,

      // Función para mostrar notificación
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

      // Función para ocultar notificación
      hideNotification: () => {
        set({
          notificacion: {
            show: false,
          },
        });
      },

      // Función para mostrar el modal
      showModalWithMessage: (message) => {
        set({
          showModal: true,
          message,
        });

        setTimeout(() => {
          get().hideModal();
        }, 1500);
      },

      showModalJoker: () => {
        set({
          showModalJokers: true,
        });
      },

      // Función para ocultar el modal
      hideModal: () => {
        set({
          showModal: false,
          message: "",
        });
      },

      // Función para ocultar el modal Joker
      hideModalJoker: () => {
        set({
          showModalJokers: false,
        });
      },
    }),
    { name: "NotificationStore" }
  )
);
