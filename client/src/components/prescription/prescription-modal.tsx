import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import AddForm from "@/app/dashboard/prescription/[appointmentId]/add-form";
import React from "react";

export default function PrescriptionModal({
  title,
  type,
  action,
  isOpen,
  onOpenChange,
}: {
  title?: string;
  type?: string;
  action?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const renderModal = (onClose: () => void, type?: string, action?: string) => {
    if (!type || !action) {
      return <p>No type or action</p>;
    }
    return <AddForm onClose={onClose} action={action} type={type} />;
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{renderModal(onClose, type, action)}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
