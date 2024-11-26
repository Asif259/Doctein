import {
    Activity,
    ClipboardList,
    EditIcon,
    FileText,
    PillIcon,
    PlusIcon,
    Stethoscope,
} from "lucide-react";
import { forwardRef, ReactNode, useEffect, useState } from "react";
import PrescriptionHeader from "@/components/prescription/prescription-header";
import { Button } from "@nextui-org/react";
import { CloseIcon } from "@nextui-org/shared-icons";
import PrescriptionModal from "@/components/prescription/prescription-modal";
import { usePrescriptionStore } from "@/store/prescription-store";
import { getPrescriptionById } from "@/api/dashboard/prescriptionAPI";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { getMedicationById } from "@/api/dashboard/medicationAPI";

const PrescriptionTemplate = forwardRef<
    HTMLDivElement,
    { isPrint?: boolean; isEditable: boolean; appointmentId: string }
>(
    (
        {
            isPrint = false,
            isEditable = false,
            appointmentId,
        }: { isPrint?: boolean; isEditable: boolean; appointmentId: string },
        ref,
    ) => {
        const {
            setModal,
            modalOpen,
            setModalOpen,
            prescription,
            setPrescription,
            setFollowUpDate,
        } = usePrescriptionStore(
            useShallow((state) => ({
                prescription: state.prescription,
                setPrescription: state.setPrescription,
                setModal: state.setModal,
                modalOpen: state.modalOpen,
                setModalOpen: state.setModalOpen,
                setFollowUpDate: state.setFollowUpDate,
            })),
        );

        useEffect(() => {
            (async () => {
                const res = await getPrescriptionById(appointmentId);
                if (res?.success) {
                    if (res.data) {
                        setPrescription({
                            complaints: res.data.complaints,
                            medications: res.data.medications,
                            instructions: res.data.instructions,
                            followUpDate: res.data.followUpDate,
                            history: res.data.history,
                            diagnosisList: res.data.diagnosis,
                            investigations: res.data.investigations,
                            appointmentId: appointmentId,
                        });
                        toast.success("Prescription loaded successfully");
                    }
                } else {
                    toast.success("Add new prescriptions");
                    setPrescription({
                        ...prescription,
                        appointmentId: appointmentId,
                    });
                }
            })();
        }, []);

        const handleAdd = () => {
            setModal({
                type: "medication",
            });
            setModalOpen(true);
        };
        return (
            <div
                ref={ref}
                id="print-precription"
                className={`${isPrint ? "w-[210mm] h-[297mm]" : "w-full h-full"} mx-auto p-8 bg-white text-black rounded-lg shadow-lg print:shadow-none`}
            >
                <PrescriptionModal
                    isOpen={modalOpen}
                    onOpenChange={setModalOpen}
                />
                <PrescriptionHeader />
                <div className="flex">
                    <div className="w-1/3 pr-4">
                        <Section
                            isEditable={isEditable}
                            type="complaint"
                            title="Chief Complaints"
                            icon={<ClipboardList className="w-4 h-4" />}
                        >
                            <ul className="list-disc pl-5 text-sm">
                                {prescription?.complaints?.map((complaint) => (
                                    <ListItem
                                        isEditable={isEditable}
                                        type="complaint"
                                        description={complaint.description}
                                        key={complaint.id}
                                        id={complaint.id}
                                    >
                                        {complaint.complaint} (
                                        {complaint.duration}) -{" "}
                                        {complaint.severity}
                                    </ListItem>
                                ))}
                            </ul>
                        </Section>

                        <Section
                            isEditable={isEditable}
                            type="history"
                            title="History"
                            icon={<FileText className="w-4 h-4" />}
                        >
                            <ul className="list-disc pl-5 text-sm">
                                {prescription?.history?.map((item) => (
                                    <ListItem
                                        isEditable={isEditable}
                                        type="history"
                                        description={item.description}
                                        key={item.id}
                                        id={item.id}
                                    >
                                        {item.description} (for {item.duration})
                                    </ListItem>
                                ))}
                            </ul>
                        </Section>

                        <Section
                            isEditable={isEditable}
                            type="diagnosis"
                            title="Diagnosis"
                            icon={<Stethoscope className="w-4 h-4" />}
                        >
                            <ul className="list-disc pl-5 text-sm">
                                {prescription?.diagnosisList?.map((item) => (
                                    <ListItem
                                        isEditable={isEditable}
                                        type="diagnosis"
                                        id={item.id}
                                        key={item.id}
                                    >
                                        {item.name} -{" "}
                                        <span className="text-[11px] text-gray-600">
                                            ({item.date})
                                        </span>
                                    </ListItem>
                                ))}
                            </ul>
                        </Section>

                        <Section
                            isEditable={isEditable}
                            type="investigation"
                            title="Investigation"
                            icon={<Activity className="w-4 h-4" />}
                        >
                            <ul className="list-disc pl-5 text-sm">
                                {prescription?.investigations?.map((item) => (
                                    <ListItem
                                        isEditable={isEditable}
                                        type="investigation"
                                        description={item.description}
                                        key={item.id}
                                        id={item.id}
                                    >
                                        {item.name} -{" "}
                                        <span className="text-[11px] text-gray-600">
                                            ({item.date})
                                        </span>
                                    </ListItem>
                                ))}
                            </ul>
                        </Section>
                    </div>

                    {/* Medication Corner */}
                    <div className="w-2/3 pl-4 border-l border-gray-300">
                        <div className="flex flex-row gap-3">
                            <h2 className="text-lg font-semibold mb-2 flex items-center">
                                <PillIcon className="w-5 h-5 mr-2" />
                                Medicine (R<sub>x</sub>)
                            </h2>
                            {isEditable && (
                                <Button
                                    onClick={() => handleAdd()}
                                    className="min-w-6 h-6 p-0 text-white bg-success"
                                    startContent={
                                        <PlusIcon
                                            size="20"
                                            className="font-black"
                                        />
                                    }
                                />
                            )}
                        </div>
                        <div className="space-y-4">
                            {prescription?.medications?.map(
                                (medication) =>
                                    medication.medicationId && (
                                        <Medication
                                            isEditable={isEditable}
                                            key={medication.id}
                                            id={medication.id}
                                            medicationId={
                                                medication.medicationId
                                            }
                                            duration={medication.duration}
                                            frequency={medication.frequency}
                                            note={medication.note}
                                        />
                                    ),
                            )}
                        </div>

                        <div className="mt-6">
                            <Header
                                isEditable={isEditable}
                                type="instruction"
                                title="Instructions"
                            />
                            {
                                <ol className="pl-5 list-decimal text-sm">
                                    {prescription.instructions?.map((item) => (
                                        <ListItem
                                            isEditable={isEditable}
                                            type="instruction"
                                            id={item.id}
                                            key={item.id}
                                        >
                                            {item.instruction}
                                        </ListItem>
                                    ))}
                                </ol>
                            }
                        </div>

                        <div className="mt-4">
                            <Header
                                type="followUp"
                                title="Follow Up"
                                isEditable={isEditable}
                            />
                            <div className="flex flex-row gap-5">
                                <p className="text-sm">
                                    <span className="underline">
                                        Next Visit:
                                    </span>{" "}
                                    {prescription.followUpDate}
                                </p>
                                {isEditable && (
                                    <div className="flex flex-row gap-1">
                                        <Button
                                            onClick={() => {
                                                setModal({
                                                    type: "followUp",
                                                });
                                                setModalOpen(true);
                                            }}
                                            className="min-w-5 h-5 p-0 bg-warning-600 text-warning-100"
                                            startContent={
                                                <EditIcon size="12" />
                                            }
                                        />
                                        <Button
                                            onClick={() => setFollowUpDate("")}
                                            className="min-w-5 h-5 p-0 bg-danger-600 text-danger-100"
                                            startContent={
                                                <CloseIcon fontSize="12" />
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
);

export function Section({
    type,
    title,
    children,
    icon,
    isEditable,
}: {
    type: "complaint" | "history" | "diagnosis" | "investigation";
    title: string;
    children: ReactNode;
    icon?: ReactNode;
    isEditable: boolean;
}) {
    const { setModal, setModalOpen } = usePrescriptionStore(
        useShallow((state) => ({
            setModal: state.setModal,
            setModalOpen: state.setModalOpen,
        })),
    );

    const handleAdd = () => {
        setModal({
            type,
        });
        setModalOpen(true);
    };
    return (
        <div className="mb-4">
            <h2 className="text-md font-semibold mb-2 flex items-center">
                {icon}
                <div className="flex flex-row gap-3 items-center">
                    <span className="ml-2">{title}</span>
                    {isEditable && (
                        <Button
                            onClick={() => handleAdd()}
                            className="min-w-6 h-6 p-0 text-white bg-success"
                            startContent={
                                <PlusIcon size="20" className="font-black" />
                            }
                        />
                    )}
                </div>
            </h2>
            {children}
        </div>
    );
}

function Header({
    type,
    title,
    icon,
    isEditable,
}: {
    type: "followUp" | "instruction";
    title: string;
    icon?: ReactNode;
    isEditable: boolean;
}) {
    const { setModal, setModalOpen } = usePrescriptionStore(
        useShallow((state) => ({
            setModal: state.setModal,
            setModalOpen: state.setModalOpen,
        })),
    );

    const handleAdd = () => {
        setModal({
            type,
        });
        setModalOpen(true);
    };

    return (
        <div className="flex flex-row gap-3">
            {icon}
            <h3 className="font-semibold mb-1">{title}</h3>
            {isEditable && (
                <Button
                    onClick={() => handleAdd()}
                    className="min-w-6 h-6 p-0 text-white bg-success"
                    startContent={<PlusIcon size="20" className="font-black" />}
                />
            )}
        </div>
    );
}

function ListItem({
    id,
    type,
    children,
    description,
    isEditable,
}: {
    id: number;
    type:
        | "complaint"
        | "history"
        | "diagnosis"
        | "investigation"
        | "instruction";
    children: ReactNode;
    description?: string;
    isEditable: boolean;
}) {
    const { setModal, setModalOpen, prescription, setPrescription } =
        usePrescriptionStore(
            useShallow((state) => ({
                setModal: state.setModal,
                setModalOpen: state.setModalOpen,
                prescription: state.prescription,
                setPrescription: state.setPrescription,
            })),
        );

    const handleEdit = (id: number) => {
        console.log("Edit Item:", id);
        setModal({
            type,
            id,
        });
        setModalOpen(true);
    };

    const handleDelete = (id: number) => {
        switch (type) {
            case "complaint": {
                const complaints = prescription.complaints.filter(
                    (item) => item.id !== id,
                );
                setPrescription({
                    ...prescription,
                    complaints,
                });
                break;
            }
            case "history": {
                const history = prescription.history.filter(
                    (item) => item.id !== id,
                );
                setPrescription({
                    ...prescription,
                    history,
                });
                break;
            }
            case "diagnosis": {
                const diagnosisList = prescription.diagnosisList.filter(
                    (item) => item.id !== id,
                );
                setPrescription({
                    ...prescription,
                    diagnosisList,
                });
                break;
            }
            case "investigation": {
                const investigations = prescription.investigations.filter(
                    (item) => item.id !== id,
                );
                setPrescription({
                    ...prescription,
                    investigations,
                });
                break;
            }
            case "instruction": {
                const instructions = prescription.instructions.filter(
                    (item) => item.id !== id,
                );
                setPrescription({
                    ...prescription,
                    instructions,
                });
                break;
            }
            default:
                break;
        }
    };

    return (
        <li>
            <div className="flex flex-row justify-between">
                <div>
                    <p>{children}</p>
                    <span className="text-[12px] text-gray-500">
                        {description}
                    </span>
                </div>
                {isEditable && (
                    <div className="flex flex-row gap-1">
                        <Button
                            onClick={() => handleEdit(id)}
                            className="min-w-5 h-5 p-0 bg-warning-600 text-warning-100"
                            startContent={<EditIcon size="12" />}
                        />
                        <Button
                            onClick={() => handleDelete(id)}
                            className="min-w-5 h-5 p-0 bg-danger-600 text-danger-100"
                            startContent={<CloseIcon fontSize="12" />}
                        />
                    </div>
                )}
            </div>
        </li>
    );
}

function Medication({
    id,
    medicationId, // TODO: medication name not showing after reloading the page. Fix it
    duration,
    frequency,
    note,
    isEditable,
}: {
    id: number;
    medicationId: string;
    duration: string;
    frequency: string;
    note?: string;
    isEditable: boolean;
}) {
    const [medication, setMedication] = useState<
        | {
              dosage_type: string;
              brand: string;
              generic: string;
              strength: string;
              manufacturer: string;
          }
        | undefined
    >();
    const { setModal, setModalOpen, prescription, setPrescription } =
        usePrescriptionStore(
            useShallow((state) => ({
                setModal: state.setModal,
                setModalOpen: state.setModalOpen,
                prescription: state.prescription,
                setPrescription: state.setPrescription,
            })),
        );

    useEffect(() => {
        (async () => {
            if (!medicationId) return;
            const res = await getMedicationById(medicationId);
            if (res?.success) {
                setMedication(res.data);
            }
        })();
    }, []);

    const handleEdit = (id: number) => {
        console.log("Edit Medication:", id, id);
        setModal({
            type: "medication",
            id,
        });
        setModalOpen(true);
    };

    const handleDelete = (id: number) => {
        const medications = prescription.medications.filter(
            (item) => item.id !== id,
        );
        setPrescription({
            ...prescription,
            medications,
        });
    };

    const calculateMedication = (): number | void => {
        if (!frequency || !duration) return;
        let count = 0;
        frequency.split("+").forEach((item) => {
            count += parseInt(item);
        });
        switch (duration) {
            case "1 week":
                return count * 7;
            case "2 weeks":
                return count * 14;
            case "3 weeks":
                return count * 21;
            case "1 month":
                return count * 30;
            case "2 months":
                return count * 60;
            case "3 months":
                return count * 90;
            case "6 months":
                return count * 180;
            case "1 year":
                return count * 365;
            default:
                return count * 30;
        }
    };

    return (
        <div className="flex flex-row justify-between">
            <div className="text-sm">
                <p className="font-semibold">
                    {`${medication?.dosage_type} ${medication?.brand} ${medication?.strength}`}{" "}
                    ---- {calculateMedication()?.toString()} pcs
                </p>
                <p>
                    {frequency} ---- {duration}
                </p>
                <p className="text-sm text-gray-400">{note}</p>
            </div>
            {isEditable && (
                <div className="flex flex-row gap-1">
                    <Button
                        onClick={() => handleEdit(id)}
                        className="min-w-5 h-5 p-0 bg-warning-600 text-warning-100"
                        startContent={<EditIcon size="12" />}
                    />
                    <Button
                        onClick={() => handleDelete(id)}
                        className="min-w-5 h-5 p-0 bg-danger-600 text-danger-100"
                        startContent={<CloseIcon fontSize="12" />}
                    />
                </div>
            )}
        </div>
    );
}

export default PrescriptionTemplate;
