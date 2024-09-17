import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { useJokerStore } from "../stores/useJokerStore";
import { useNotificationStore } from "../stores/useNotificationStore";


export default function GameJokers() {
  const [selectedJoker, setSelectedJoker] = useState(false);

  const { selectRandomCards, selecJoker } = useJokerStore((state) => ({
    selectRandomCards: state.selectRandomCards,
    selecJoker: state.selecJoker,
  }));

  const {hideModalGameJokers } = useNotificationStore((state) => ({
    hideModalGameJokers: state.hideModalGameJokers
  }));

  return (
    <div className="flex flex-col items-center justify-center">
      <Button
        className="w-full h-60"
        style={{ backgroundColor: selecJoker?.color || "#ddd" }}
        onClick={() => {
          if (selectedJoker === false) {
            selectRandomCards();
            setSelectedJoker(true)
            hideModalGameJokers()
          }
        }}
      >
        {/* Mostrar detalles del joker seleccionado */}
        <div className="text-black text-center text-wrap">
          <h1 className="text-xl font-bold">{selecJoker?.title || "Jokers"}</h1>
          <p className="text-lg">
            {selecJoker?.description || "Selecciona un joker"}
          </p>
        </div>
      </Button>
    </div>
  );
}
