import React from "react";
import { useNotificationStore } from "../stores/useNotificationStore";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";

import GameJokers from "./GameJokers";

export default function GamePrizes() {
  const { showModalJoker, hideModalGameJokers } = useNotificationStore((state) => ({
    hideModalGameJokers: state.hideModalGameJokers,
    showModalJoker: state.showModalJoker
  }));

  return (
    <Modal
      className="w-4/5"
      isOpen={showModalJoker}
      onOpenChange={hideModalGameJokers}
      placement="center"
    >
      <ModalContent>
        <ModalHeader> Recompesas </ModalHeader>

        <ModalBody>
          <div className="flex flex-col justify-center items-center gap-4 p-2">
            <GameJokers />

            <div className="flex justify-between w-full gap-5">
              <Button
                className="w-full text-xl font-semibold"
                color="danger"
                variant="ghost"
                onClick={hideModalGameJokers}
              >
                +Descarte
              </Button>
              <Button
                className="w-full text-xl font-semibold"
                color="success"
                variant="ghost"
                onClick={hideModalGameJokers}
              >
                +Jugada
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
