import React from "react";
import { NavLink } from "react-router-dom";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  AccordionItem,
  Accordion,
} from "@nextui-org/react";

import { Rules } from "../json/Rules";
import { HomeIcon, Bars3Icon, ArrowPathIcon  } from "@heroicons/react/20/solid";

export default function Jokers() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent">
        <Bars3Icon className="h-10 w-10 text-custom-gray" />
      </Button>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {" "}
                Comodines / Reglas
              </ModalHeader>

              <ModalBody>
                <div className="text-center flex">
                  <NavLink to="/" className="w-3/5">
                    <Button className="bg-custom-green-light">
                      <HomeIcon className="h-10 w-10 text-white" />
                    </Button>
                  </NavLink>

                  <NavLink to="/placeGame" className="w-3/5">
                    <Button color="danger">
                      <ArrowPathIcon className="h-10 w-10 text-white" />
                    </Button>
                  </NavLink>
                </div>

                <Accordion>
                  <AccordionItem
                    key="1"
                    aria-label="Comodines"
                    title="Comodines"
                  >
                    Comodines
                  </AccordionItem>
                  <AccordionItem key="2" aria-label="Manos" title="Manos">
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-center text-custom-green-dark">
                        Juegos de manos reconocibles
                      </h1>

                      {Rules.map((rule, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <span className="font-bold">{rule.title}:</span>
                          {rule.body}
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                </Accordion>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
