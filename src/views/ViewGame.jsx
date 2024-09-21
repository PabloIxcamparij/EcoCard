import React, { useEffect } from "react";

import { Howl } from "howler";
import { Button } from "@nextui-org/react";
import { Bars3Icon } from "@heroicons/react/20/solid";

// Componentes
import NotificationGeneral from "../components/NotificationGeneral";
import NotificationGame from "../components/NotificationGame";
import GamePlaceCards from "../components/GamePlaceCards";
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
  } = useGameStore((state) => ({
    discardAvailable: state.discardAvailable,
    playAvailable: state.playAvailable,
    goalScore: state.goalScore,
    handScore: state.handScore,
    handType: state.handType,
    nextLevel: state.nextLevel,
    restartGame: state.restartGame,
  }));

  useEffect(() => {
    restartGame();
  }, []);

  useEffect(() => {
    useGameStore.getState().handlePlayCards(1);
  }, [selectedCards]);

  useEffect(() => {
    if (playAvailable === 0 && goalScore > 0) {
      useNotificationStore
        .getState()
        .showModalGameNotification("Perdido");
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
<div className="flex flex-col min-h-screen items-center text-white  p-4">
<NotificationGeneral />
      <NotificationGame />
      <GamePrizes />

      <div className="flex justify-around items-center w-full h-12">
        <Button
          className="bg-transparent"
          onClick={() => {
            useNotificationStore.getState().showModalGameMenu();
          }}
        >
          <Bars3Icon className="h-10 w-10 text-custom-gray" />
          <GameMenu />
        </Button>

        <GameHeader title={"Valor"} score={handScore} />
        <GameHeader title={"Tipo"} score={handType} />
      </div>

      <div className="w-full text-danger font-bold text-lg text-center mt-4">
        <h1>
          {"Objetivo:"} {goalScore}
        </h1>
      </div>

      <div className="flex flex-wrap justify-around items-center w-full gap-6 mt-5 mb-2">
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
