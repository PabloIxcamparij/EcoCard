import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

export default function ModalWin({ isOpen, onClose, message }) {

  return (
    <Modal className="w-4/5" isOpen={isOpen} onOpenChange={onClose} placement="center">

      <ModalContent>

        <ModalHeader className="flex flex-col gap-1">Has</ModalHeader>

        <ModalBody className="flex items-center">
          <p className="text-2xl font-bold mb-5">{message}</p>
        </ModalBody>

      </ModalContent>
    </Modal>
  );
}