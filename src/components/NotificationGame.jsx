import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useNotificationStore } from "../stores/useNotificationStore";

export default function NotificationGame() {

  const { message,showModalNotification, hideModalGameNotification } = useNotificationStore((state) => ({
    message: state.message,
    showModalNotification: state.showModalNotification,
    hideModalGameNotification: state.hideModalGameNotification
  }));

  return (
    <Modal className="w-4/5" isOpen={showModalNotification} onOpenChange={hideModalGameNotification} placement="center">

      <ModalContent>

        <ModalHeader className="flex flex-col gap-1">Has</ModalHeader>

        <ModalBody className="flex items-center">
          <p className="text-2xl font-bold mb-5">{message}</p>
        </ModalBody>

      </ModalContent>
    </Modal>
  );
}