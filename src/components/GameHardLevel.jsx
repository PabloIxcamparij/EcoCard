import React, { useState } from "react";
import { useNotificationStore } from "../stores/useNotificationStore";
import { useLevelLimity } from "../stores/useLevelLimity";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";

export default function GameHardLevel() {
  const [selectCard, setSelectCard] =  useState(false)

  const { showModalHardLevel, hideModalGameHardLevel } = useNotificationStore(
    (state) => ({
      hideModalGameHardLevel: state.hideModalGameHardLevel,
      showModalHardLevel: state.showModalHardLevel,
    })
  );

  const { selectRandomLimity, handLimity } = useLevelLimity((state) => ({
    selectRandomLimity: state.selectRandomLimity,
    handLimity: state.handLimity,
  }));

  return (
    <Modal
      className="w-4/5"
      isOpen={showModalHardLevel}
      placement="center"
    >
      <ModalContent>
        <ModalHeader>Advertencia, Nivel Difícil</ModalHeader>

        <ModalBody>
          <div className="flex flex-col items-center justify-center mb-5">
            <Button
              className="w-full h-60"
              style={{ backgroundColor: handLimity?.color || "#000" }}
              onClick={() => {
                if (selectCard === false) {
                  selectRandomLimity();
                  setSelectCard(true)
                }else{
                  hideModalGameHardLevel();
                  setSelectCard(false)
                }
              }}
            >
              <div className="text-white text-center text-wrap">
                <h1 className="text-xl font-bold">
                  {handLimity?.title || "Título no disponible"}
                </h1>
                <p className="text-lg">
                  {handLimity?.description || "Descripción no disponible"}
                </p>
              </div>
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
