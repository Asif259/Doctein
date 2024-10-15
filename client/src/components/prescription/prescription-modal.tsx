import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import AddForm from "@/app/dashboard/prescription/[appointmentId]/add-form";
import React from "react";
import { usePrescriptionStore } from "@/store/prescription-store";

export default function PrescriptionModal({
  title,
  isOpen,
  onOpenChange,
}: {
  title?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const modal = usePrescriptionStore((state) => state.modal);

  const renderModal = (onClose: () => void) => {
    return <AddForm onClose={onClose} id={modal?.id} type={modal?.type} />;
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{renderModal(onClose)}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
