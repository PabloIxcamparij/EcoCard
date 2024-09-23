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
      showModalMenu: false,
      showModalJoker: false,
      showModalHardLevel: false,
      showModalNotification: false,
      message: "",

      // Función para mostrar NotificationGeneral
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

      // Función para ocultar NotificationGeneral
      hideNotification: () => {
        set({
          notificacion: {
            show: false,
          },
        });
      },

      // Función para mostrar el modal NotificationGame
      showModalGameNotification: (message) => {
        set({
          showModalNotification: true,
          message,
        });

        setTimeout(() => {
          get().hideModalGameNotification();
        }, 1500);
      },

      // Función para ocultar el modal NotificationGame
      hideModalGameNotification: () => {
        set({
          showModalNotification: false,
          message: "",
        });
      },

      // Función para mostrar el modal GameMenu
      showModalGameMenu: () => {
        set({
          showModalMenu: true,
        });
      },

      // Función para ocultar el modal GameMenu
      hideModalGameMenu: () => {
        set({
          showModalMenu: false,
        });
      },

      // Función para mostrar el modal GameJokers
      showModalGameJokers: () => {
        set({
          showModalJoker: true,
        });
      },

      // Función para ocultar el modal GameJokers
      hideModalGameJokers: () => {
        set({
          showModalJoker: false,
        });
      },

      // Función para mostrar el modal GameHardLevel
      showModalGameHardLevel: () => {
        set({
          showModalHardLevel: true,
        });
      },

      // Función para ocultar el modal GameHardLevel
      hideModalGameHardLevel: () => {
        set({
          showModalHardLevel: false,
        });
      },
    }),
    { name: "NotificationStore" }
  )
);
