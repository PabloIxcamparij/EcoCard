import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useNotificationStore = create(
  devtools(
    (set, get) => ({
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
    { name: "NotificationStore" }
  )
);
