import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";

import GameJokers from "./GameJokers";

export default function GamePrizes({ isOpen, onClose }) {
  return (
    <Modal
      className="w-4/5"
      isOpen={isOpen}
      onOpenChange={onClose}
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
              >
                +Descarte
              </Button>
              <Button
                className="w-full text-xl font-semibold"
                color="success"
                variant="ghost"
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
