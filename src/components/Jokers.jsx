import React from "react";
import { NavLink } from "react-router-dom";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  AccordionItem,
  Accordion,
} from "@nextui-org/react";

import { Rules } from "../json/Rules";
import MusicButton from "./MusicButton";
import { HomeIcon, ArrowPathIcon } from "@heroicons/react/20/solid";

export default function Jokers({isOpen, onClose}) {

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      className="w-5/6"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Comodines / Reglas
        </ModalHeader>

        <ModalBody>
          <div className="text-center flex flex-wrap justify-center gap-6">

            <NavLink to="/" className="w-3/12">
              <Button className="bg-custom-green-dark">
                <HomeIcon className="h-8 text-white" />
              </Button>
            </NavLink>

            <NavLink className="w-3/12">
              <Button color="danger">
                <ArrowPathIcon className="h-8 text-white" />
              </Button>
            </NavLink>

            <MusicButton/>

          </div>

          <Accordion>
            <AccordionItem key="1" aria-label="Comodines" title="Comodines">
              Comodines
            </AccordionItem>
            <AccordionItem key="2" aria-label="Manos" title="Manos">
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-center text-custom-green-dark">
                  Juegos de manos reconocibles
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
