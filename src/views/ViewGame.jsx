import React, { useEffect } from "react";

import { Howl } from "howler";
import { Button } from "@nextui-org/react";
import { Bars3Icon } from "@heroicons/react/20/solid";

// Componentes
import Jokers from "../components/Jokers";
import Notification from "../components/Notification";
import GameMessage from "../components/GameMessage";
import PlaceCards from "../components/PlaceCards";
import MessageHeader from "../components/MessageHeader";

// Stores
import { useCardStore } from "../stores/useCardStore";
import { useGameStore } from "../stores/useGameStore";
import { useNotificationStore } from "../stores/useNotificationStore";

export default function ViewGame() {
  const { selectedCards, restarGameCards } = useCardStore((state) => ({
    restarGameCards: state.restarGameCards,
    selectedCards: state.selectedCards
  }));

  const {
    handleDiscardCards,
    handlePlayCards,
    discardAvailable,
    playAvailable,
    goalScore,
    handScore,
    handType,
    nextGame,
    saveScore,
    restarGame,
  } = useGameStore((state) => ({
    handleDiscardCards: state.handleDiscardCards,
    handlePlayCards: state.handlePlayCards,
    discardAvailable: state.discardAvailable,
    playAvailable: state.playAvailable,
    goalScore: state.goalScore,
    handScore: state.handScore,
    handType: state.handType,
    saveScore: state.saveScore,
    nextGame: state.nextGame,
    restarGame: state.restarGame,
  }));

  const { showModal, showModalJokers, message, hideModal, hideModalJoker } =
    useNotificationStore((state) => ({
      showModalJokers: state.showModalJokers,
      hideModalJoker: state.hideModalJoker,
      hideModal: state.hideModal,
      showModal: state.showModal,
      message: state.message,
    }));

  useEffect(() => {
    restarGameCards();
    restarGame();
  }, []);

  useEffect(() => {
    handlePlayCards(1);
  }, [selectedCards]);

  useEffect(() => {
    if (playAvailable === 0 && goalScore > 0) {
      useNotificationStore.getState().showModalWithMessage("Perdido");
      restarGameCards();
      restarGame();
      // saveScore(1);
    } else if (goalScore <= 0) {
      useNotificationStore
        .getState()
        .showModalWithMessage("Pasado al siguiente nivel");
      restarGameCards();
      nextGame();
      saveScore(0);
    }
  }, [playAvailable]);

  // Sound for activating button
  const activationSound = new Howl({
    src: ["/songs/Effect-Card-Start.mp3"],
    volume: 0.5,
  });

  return (
    <div className="flex flex-col items-center h-screen text-white bg-custom-white gap-5 p-3">
      <Notification />
      <GameMessage isOpen={showModal} onClose={hideModal} message={message} />

      <div className="flex justify-around items-center w-full">
        
        <Button
          className="bg-transparent"
          onClick={() => {
            useNotificationStore.getState().showModalJoker();
          }}
        >
          <Bars3Icon className="h-10 w-10 text-custom-gray" />
          <Jokers isOpen={showModalJokers} onClose={hideModalJoker} />
        </Button>

        <MessageHeader title={"Valor"} score={handScore} />
        <MessageHeader title={"Tipo"} score={handType} />
      </div>

      <div className="w-full text-danger font-bold text-xl text-center mt-5">
        <h1>
          {"Objetivo:"} {goalScore}
        </h1>
      </div>

      <div className="flex flex-wrap justify-around items-center w-full gap-6 mt-5 mb-5">
        <Button
          className="rounded-full w-2/5 font-bold text-xl"
          color="danger"
          variant="ghost"
          onClick={() => {
            handleDiscardCards(0);
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
            handlePlayCards(0);
            activationSound.play();
          }}
        >
          {playAvailable}
        </Button>

        <PlaceCards />
      </div>
    </div>
  );
}
