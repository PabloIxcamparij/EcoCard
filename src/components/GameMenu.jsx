import React from "react";
import ButtonMusic from "../components/ButtonMusic";
import GameHandJokers from "../components/GameHandJokers";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  AccordionItem,
  Accordion,
} from "@nextui-org/react";

import { HomeIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";
import { Rules } from "../json/Rules";

import { useJokerStore } from "../stores/useJokerStore";
import { useGameStore } from "../stores/useGameStore";
import { useNotificationStore } from "../stores/useNotificationStore";

export default function GameMenu() {
  const { restartGame } = useGameStore((state) => ({
    restartGame: state.restartGame,
  }));

  const { handJokers } = useJokerStore((state) => ({
    handJokers: state.handJokers,
  }));

  const { showModalMenu, hideModalGameMenu } = useNotificationStore(
    (state) => ({
      hideModalGameMenu: state.hideModalGameMenu,
      showModalMenu: state.showModalMenu,
    })
  );

  return (
    <Modal
      isOpen={showModalMenu}
      onOpenChange={hideModalGameMenu}
      className="w-4/5"
      scrollBehavior="inside"
      placement="center"
    >
      <ModalContent>
        <ModalHeader>Menu</ModalHeader>

        <ModalBody>
          <div className="text-center flex flex-wrap justify-center">
            <div className="flex justify-between w-full gap-2">
              <NavLink to="/" className="w-3/12">
                <Button className="bg-custom-green-dark">
                  <HomeIcon className="h-8 text-white" />
                </Button>
              </NavLink>

              <Button
                color="danger"
                className="w-3/12"
                onClick={() => {
                  restartGame();
                  hideModalGameMenu();
                }}
              >
                <ArrowPathIcon className="h-8 text-white" />
              </Button>
            </div>

            <ButtonMusic />
          </div>

          <Accordion>
            <AccordionItem key="1" aria-label="Comodines" title="Comodines">
              <div className="flex flex-wrap gap-2 w-full">
                {handJokers.map((Joker, index) => (
                  <GameHandJokers key={index} Joker={Joker} />
                ))}
              </div>
            </AccordionItem>

            <AccordionItem key="2" aria-label="Manos" title="Manos">
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-center text-custom-green-dark">
                  Juegos de manos permitidos
                </h1>

                {Rules.map((rule, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <h1>
                      <span className="font-bold">{rule.title}: </span>
                      {rule.body}{" "}
                    </h1>
                  </div>
                ))}
              </div>
            </AccordionItem>
          </Accordion>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
