import React from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
} from "@nextui-org/react";
import { X } from "lucide-react";

const CustomModal = ({title, isOpen, onClose , children }: {title: string; isOpen: boolean; onClose: () => void;  children: React.ReactNode;}) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            size="md"
            classNames={{
                base: "bg-white",
                backdrop: "bg-black/50 backdrop-blur-sm",
                header: "border-b border-gray-200",
                body: "py-6",
                footer: "border-t border-gray-200",
                closeButton: "hover:bg-gray-100 active:bg-gray-200",
            }}
            closeButton={
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            }
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
