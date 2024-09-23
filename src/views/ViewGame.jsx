import React, { useEffect } from "react";

import { Howl } from "howler";
import { Button } from "@nextui-org/react";
import { Bars3Icon } from "@heroicons/react/20/solid";

// Componentes
import NotificationGeneral from "../components/NotificationGeneral";
import NotificationGame from "../components/NotificationGame";
import GamePlaceCards from "../components/GamePlaceCards";
import GameHardLevel from "../components/GameHardLevel";
import GameHeader from "../components/GameHeader";
import GamePrizes from "../components/GamePrizes";
import GameMenu from "../components/GameMenu";

// Stores
import { useCardStore } from "../stores/useCardStore";
import { useGameStore } from "../stores/useGameStore";
import { useNotificationStore } from "../stores/useNotificationStore";

export default function ViewGame() {
  const { selectedCards } = useCardStore((state) => ({
    selectedCards: state.selectedCards,
  }));

  const {
    discardAvailable,
    playAvailable,
    goalScore,
    handScore,
    handType,
    nextLevel,
    restartGame,
    currentLevel,
  } = useGameStore((state) => ({
    discardAvailable: state.discardAvailable,
    playAvailable: state.playAvailable,
    goalScore: state.goalScore,
    handScore: state.handScore,
    handType: state.handType,
    nextLevel: state.nextLevel,
    restartGame: state.restartGame,
    currentLevel: state.currentLevel,
  }));

  useEffect(() => {
    restartGame();
  }, []);

  useEffect(() => {
    useGameStore.getState().handlePlayCards(1);
  }, [selectedCards]);

  useEffect(() => {
    if (playAvailable === 0 && goalScore > 0) {
      useNotificationStore.getState().showModalGameNotification("Perdido");
      restartGame();
      useGameStore.getState().saveScore(1);
    } else if (goalScore <= 0) {
      nextLevel();
    }
  }, [playAvailable]);

  // Sound for activating button
  const activationSound = new Howl({
    src: ["/songs/Effect-Card-Start.mp3"],
    volume: 0.5,
  });

  return (
    <div className="flex flex-col min-h-screen items-center text-white bg-gray-100 p-4">
      <NotificationGeneral />
      <NotificationGame />
      <GamePrizes />
      <GameHardLevel />

      <div className="flex flex-col items-center w-full text-gray-700 font-bold">
        <div className="flex justify-between items-center w-full mb-4">
          <Button
            className="bg-transparent"
            onClick={() => {
              useNotificationStore.getState().showModalGameMenu();
            }}
          >
            <Bars3Icon className="h-10 w-10 text-custom-gray" />
            <GameMenu />
          </Button>

          <h1 className="text-center">{`Objetivo: ${goalScore}`}</h1>

          <h1 >{`Nivel: ${currentLevel + 1}`}</h1>
        </div>


        <div className="flex justify-center w-full">
          <GameHeader title={"Valor"} score={handScore} className="mx-4" />
          <GameHeader title={"Tipo"} score={handType} className="mx-4" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center w-full gap-6 mt-5 mb-2">
        <Button
          className="rounded-full w-2/5 font-bold text-xl"
          color="danger"
          variant="ghost"
          onClick={() => {
            useGameStore.getState().handleDiscardCards(0);
            activationSound.play();
          }}
        >
          {discardAvailable}
        </Button>

        <Button
          className="rounded-full w-2/5 font-bold text-xl"
          color="success"
          variant="ghost"
          onClick={() => {
            useGameStore.getState().handlePlayCards(0);
            activationSound.play();
          }}
        >
          {playAvailable}
        </Button>

        <GamePlaceCards className="" />
      </div>
    </div>
  );
}
