import { create } from "zustand";
import { Howl } from "howler";
import { devtools } from "zustand/middleware";

export const useMusicStore = create(
  devtools(
    (set, get) => ({
      isPlaying: false,
      backgroundMusic: null,

      // Inicializa la música si no está ya inicializada
      initMusic: () => {
        let { backgroundMusic } = get();

        if (!backgroundMusic) {
          const music = new Howl({
            src: ["/songs/Ost.mp3"],
            loop: true,
            volume: 0.2,
          });
          set({ backgroundMusic: music });
          backgroundMusic = music; // Actualizar backgroundMusic para que esté disponible
        }

        return backgroundMusic;
      },

      // Función para reproducir o pausar la música
      toggleMusic: () => {
        const { isPlaying, initMusic } = get();
        const music = initMusic(); // Asegurarse de que la música esté inicializada

        if (music) {
          if (isPlaying) {
            music.pause();
          } else {
            music.play();
          }

          set({ isPlaying: !isPlaying });
        }
      },

      // Limpiar la música cuando se requiera
      stopMusic: () => {
        const { backgroundMusic } = get();
        if (backgroundMusic) {
          backgroundMusic.stop();
        }
        set({ isPlaying: false });
      },
    }),
    { name: "MusicStore" }
  )
);
