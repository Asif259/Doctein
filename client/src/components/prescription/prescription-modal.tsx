import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function PrescriptionModal({
  title,
  isOpen,
  onOpenChange,
}: {
  title: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p>Modal content</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-danger-500 border-danger-500"
                  variant="bordered"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  className="bg-secondary-600 text-secondary-50"
                  variant="solid"
                  onPress={onClose}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
