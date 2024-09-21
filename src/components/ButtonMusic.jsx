import { PlayIcon, PauseIcon } from "@heroicons/react/20/solid";
import {useMusicStore} from "../stores/useMusicStore"

export default function ButtonMusic() {
   // Usamos el store para controlar la música
  const { isPlaying, toggleMusic } = useMusicStore((state) =>({
    isPlaying: state.isPlaying,
    toggleMusic: state.toggleMusic,
  }));

  return (
    <button
      onClick={toggleMusic}
      className={`w-3/12 flex justify-center items-center rounded-xl p-1 gap-1 ${
        isPlaying ? "bg-custom-red" : "bg-custom-green-light"
      } text-white font-bold text-2xl`}
    >
      {isPlaying ? (
        <>
          <PauseIcon className="h-8" />
        </>
      ) : (
        <>
          <PlayIcon className="h-8" />
        </>
      )}
    </button>
  );
};
