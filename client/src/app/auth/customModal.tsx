import React from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
} from "@nextui-org/react";

const CustomModal = ({title, isOpen, onClose , children }: {title: string; isOpen: boolean; onClose: () => void;  children: React.ReactNode;}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>
                    <h2 className="text-lg">{title}</h2>
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
