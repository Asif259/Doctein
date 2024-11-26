import React, { useState, DragEvent, ChangeEvent } from "react";
import { Card, Button } from "@nextui-org/react";
import { uploadPrescription } from "@/api/dashboard/prescriptionAPI";
import toast from "react-hot-toast";
import Image from "next/image";
import { IAppointment } from "@/types/dashboard";

const DragAndDropFileUpload = ({
    appointment,
    setAppointment,
    onClose,
}: {
    appointment: IAppointment | null;
    setAppointment: (appointment: IAppointment) => void;
    onClose: () => void;
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

    // Handle drag over
    const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setIsDraggedOver(true);
    };

    // Handle drag leave
    const handleDragLeave = (): void => {
        setIsDraggedOver(false);
    };

    // Handle file drop
    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setIsDraggedOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    // Handle file input change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    // Handle file upload (Mocked in this case)
    const handleUpload = async () => {
        console.log("DND", appointment?.key);
        if (selectedFile && appointment?.key) {
            // Here you'd typically upload the file using an API or FormData
            const res = await uploadPrescription(
                selectedFile,
                appointment?.key,
            );
            if (res?.success) {
                toast.success("Prescription uploaded successfully");
                setAppointment({ ...appointment, snapshot: res.data });
                onClose();
            }
        }
    };

    return (
        <Card
            className={`min-w-[400px] p-4 border-[${isDraggedOver ? "2px dashed #0070f3" : "2px dashed #ccc"}] bg-[${isDraggedOver ? "#f0f0f0" : "#fff"}] text-center`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="fileInput"
                />
                <label
                    htmlFor="fileInput"
                    className="bg-gray-200 border-dashed border-2 border-gray-300 p-4 rounded-md cursor-pointer h-[250px] flex items-center justify-center"
                    style={{}}
                >
                    {selectedFile ? (
                        <Image
                            src={URL.createObjectURL(selectedFile)}
                            alt={selectedFile.name}
                            className="h-fit"
                            width={150}
                            height={150}
                        />
                    ) : (
                        <>
                            {appointment?.snapshot ? (
                                <Image
                                    src={
                                        process.env.NEXT_PUBLIC_API_STATIC_URL +
                                        appointment?.snapshot
                                    }
                                    alt="Prescription"
                                    className="w-auto h-auto"
                                    width={150}
                                    height={150}
                                />
                            ) : (
                                <p>Drag & Drop your file here</p>
                            )}
                        </>
                    )}
                </label>
            </div>

            {selectedFile && <p>Selected File: {selectedFile.name}</p>}

            <Button
                onClick={handleUpload}
                disabled={!selectedFile}
                className="mt-4"
            >
                Upload
            </Button>
        </Card>
    );
};

export default DragAndDropFileUpload;
