import React, { useEffect, useState } from "react";
import Jokers from "../components/Jokers";
import Notification from "../components/Notification";
import GameMessage from "../components/GameMessage";
import PlaceCards from "../components/PlaceCards";
import MessageHeader from "../components/MessageHeader";
import { Button } from "@nextui-org/react";
import { useCardStore } from "../stores/useCardStore";
import { useGameStore } from "../stores/useGameStore";
import { useNotificationStore } from "../stores/useNotificationStore";

export default function PlaceGame() {
  const { selectRandomCards } = useCardStore((state) => ({
    selectRandomCards: state.selectRandomCards,
  }));

  const {
    handleDiscardCards,
    handlePlayCards,
    discardAvailable,
    playAvailable,
    goolScore,
  } = useGameStore((state) => ({
    handleDiscardCards: state.handleDiscardCards,
    handlePlayCards: state.handlePlayCards,
    discardAvailable: state.discardAvailable,
    playAvailable: state.playAvailable,
    goolScore: state.goolScore,
  }));

  const { showModal, message, hideModal } = useNotificationStore((state) => ({
    showModal: state.showModal,
    message: state.message,
    hideModal: state.hideModal,
  }));

  useEffect(() => {
    selectRandomCards();
  }, [selectRandomCards]);

  useEffect(() => {
    if (playAvailable === 0 && goolScore > 0) {
      useNotificationStore.getState().showModalWithMessage("Perdido");
    } else if (goolScore <= 0) {
      useNotificationStore.getState().showModalWithMessage("Ganado");
    }
  }, [playAvailable, goolScore]);

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-[#F2E8CF] p-3 overflow-auto text-white">
      <Notification />
      <GameMessage isOpen={showModal} onClose={hideModal} message={message} />

      <div className="flex justify-between w-full items-center p-5">
        <Jokers />

        <MessageHeader title={"Mano"} score={goolScore} />
        <MessageHeader title={"Objetivo"} score={goolScore} />
      </div>

      <div className="flex flex-wrap justify-around items-center w-full gap-6">
        <Button
          className="rounded-full w-2/5 font-bold text-xl"
          color="danger"
          variant="ghost"
          onClick={() => handleDiscardCards(0)}
        >
          {discardAvailable}
        </Button>
        <Button
          className="rounded-full w-2/5 font-bold text-xl"
          color="success"
          variant="ghost"
          onClick={() => handlePlayCards()}
        >
          {playAvailable}
        </Button>

        <PlaceCards />
      </div>
    </div>
  );
}
