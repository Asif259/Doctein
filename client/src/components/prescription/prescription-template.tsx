import {
  ClipboardList,
  FileText,
  Stethoscope,
  Activity,
  EditIcon,
  PlusIcon,
  PillIcon,
} from "lucide-react";
import { forwardRef, ReactNode, useEffect } from "react";
import PrescriptionHeader from "@/components/prescription/prescription-header";
import { Button } from "@nextui-org/react";
import { CloseIcon } from "@nextui-org/shared-icons";
import { useDashboardStore } from "@/store/dashboard-store";
import PrescriptionModal from "@/components/prescription/prescription-modal";
import { usePrescriptionStore } from "@/store/prescription-store";
import { getPrescriptionById } from "@/api/dashboard/prescriptionAPI";
import toast from "react-hot-toast";

const PrescriptionTemplate = forwardRef<
  HTMLDivElement,
  { isPrint?: boolean; appointmentId: string }
>(
  (
    {
      isPrint = false,
      appointmentId,
    }: { isPrint?: boolean; appointmentId: string },
    ref,
  ) => {
    const isEditable = useDashboardStore((state) => state.isEditable);
    const { modal, setModal, modalOpen, setModalOpen } = usePrescriptionStore(
      (state) => state,
    );
    const { prescription, setPrescription } = usePrescriptionStore(
      (state) => state,
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
              followUpDate: res.data.followUp,
              history: res.data.history,
              diagnosisList: res.data.diagnosis,
              investigations: res.data.investigations,
              appointmentId: appointmentId,
            });
            toast.success("Prescription loaded successfully");
          }
        } else {
          toast.success("Add new prescription");
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
        action: "add",
      });
      setModalOpen(true);
    };
    return (
      <div
        ref={ref}
        id="print-precription"
        className={`${isPrint ? "w-[210mm] h-[297mm]" : "w-full h-full"} mx-auto p-8 rounded-lg bg-white shadow-lg print:shadow-none`}
      >
        <PrescriptionModal
          type={modal?.type}
          action={modal?.action}
          isOpen={modalOpen}
          onOpenChange={setModalOpen}
        />
        <PrescriptionHeader />
        <div className="flex">
          <div className="w-1/3 pr-4">
            <Section
              type="complaint"
              title="Chief Complaints"
              icon={<ClipboardList className="w-4 h-4" />}
            >
              <ul className="list-disc pl-5 text-sm">
                {prescription?.complaints?.map((complaint, index) => (
                  <ListItem
                    type="complaint"
                    description={complaint.description}
                    key={index}
                  >
                    {complaint.complaint} ({complaint.duration}) -{" "}
                    {complaint.severity}
                  </ListItem>
                ))}
              </ul>
            </Section>

            <Section
              type="history"
              title="History"
              icon={<FileText className="w-4 h-4" />}
            >
              <ul className="list-disc pl-5 text-sm">
                {prescription?.history?.map((item, index) => (
                  <ListItem
                    type="history"
                    description={item.description}
                    key={index}
                  >
                    {item.description} (for {item.duration})
                  </ListItem>
                ))}
              </ul>
            </Section>

            <Section
              type="diagnosis"
              title="Diagnosis"
              icon={<Stethoscope className="w-4 h-4" />}
            >
              <ul className="list-disc pl-5 text-sm">
                {prescription?.diagnosisList?.map((item, index) => (
                  <ListItem type="diagnosis" key={index}>
                    {item.name} -{" "}
                    <span className="text-[11px] text-gray-600">
                      ({item.date})
                    </span>
                  </ListItem>
                ))}
              </ul>
            </Section>

            <Section
              type="investigation"
              title="Investigation"
              icon={<Activity className="w-4 h-4" />}
            >
              <ul className="list-disc pl-5 text-sm">
                {prescription?.investigations?.map((item, index) => (
                  <ListItem
                    type="investigation"
                    description={item.description}
                    key={index}
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
                  startContent={<PlusIcon size="20" className="font-black" />}
                />
              )}
            </div>
            <div className="space-y-4">
              {prescription?.medications?.map((medication, index) => (
                <Medication
                  key={index}
                  type={medication.type}
                  name={medication.name}
                  dosage={medication.dosage}
                  duration={medication.duration}
                  frequency={medication.frequency}
                />
              ))}
            </div>

            <div className="mt-6">
              <Header type="instruction" title="Instructions" />
              {
                <ol className="pl-5 list-decimal text-sm">
                  {prescription.instructions?.map((item, index) => (
                    <ListItem type="instruction" key={index}>
                      {item.instruction}
                    </ListItem>
                  ))}
                </ol>
              }
            </div>

            <div className="mt-4">
              <Header type="followUp" title="Follow Up" />
              <p className="text-sm">
                <span className="underline">Next Visit:</span>{" "}
                {prescription.followUpDate}
              </p>
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
}: {
  type: "complaint" | "history" | "diagnosis" | "investigation";
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  const isEditable = useDashboardStore((state) => state.isEditable);
  const { setModal, setModalOpen } = usePrescriptionStore((state) => state);

  const handleAdd = () => {
    setModal({
      type,
      action: "add",
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
              startContent={<PlusIcon size="20" className="font-black" />}
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
}: {
  type: "followUp" | "instruction";
  title: string;
  icon?: ReactNode;
}) {
  const isEditable = useDashboardStore((state) => state.isEditable);
  const { setModal, setModalOpen } = usePrescriptionStore((state) => state);

  const handleAdd = () => {
    setModal({
      type,
      action: "add",
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
  type,
  children,
  description,
}: {
  type: "complaint" | "history" | "diagnosis" | "investigation" | "instruction";
  children: ReactNode;
  description?: string;
}) {
  const isEditable = useDashboardStore((state) => state.isEditable);
  const { setModal, setModalOpen } = usePrescriptionStore((state) => state);

  const handleEdit = (id: string) => {
    setModal({
      type,
      action: "edit",
      id: parseInt(id),
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setModal({
      type,
      action: "delete",
      id: parseInt(id),
    });
    setModalOpen(true);
  };

  return (
    <li>
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-gray-900">{children}</p>
          <span className="text-[12px] text-gray-500">{description}</span>
        </div>
        {isEditable && (
          <div className="flex flex-row gap-1">
            <Button
              onClick={() => handleEdit("1")}
              className="min-w-5 h-5 p-0 bg-warning-600 text-warning-100"
              startContent={<EditIcon size="12" />}
            />
            <Button
              onClick={() => handleDelete("1")}
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
  type,
  name,
  dosage,
  duration,
  quantity,
  frequency,
}: {
  type: string;
  name: string;
  dosage: string;
  duration: string;
  quantity?: string;
  frequency: string;
}) {
  const isEditable = useDashboardStore((state) => state.isEditable);
  const { setModal, setModalOpen } = usePrescriptionStore((state) => state);

  const handleEdit = (id: string) => {
    setModal({
      type: "medication",
      action: "edit",
      id: parseInt(id),
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setModal({
      type: "medication",
      action: "delete",
      id: parseInt(id),
    });
    setModalOpen(true);
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="text-sm">
        <p className="font-semibold">
          {type} {name} {dosage} ---- {quantity || "40pcs"}
        </p>
        <p>
          {frequency} ---- {duration}
        </p>
      </div>
      {isEditable && (
        <div className="flex flex-row gap-1">
          <Button
            onClick={() => handleEdit("1")}
            className="min-w-5 h-5 p-0 bg-warning-600 text-warning-100"
            startContent={<EditIcon size="12" />}
          />
          <Button
            onClick={() => handleDelete("1")}
            className="min-w-5 h-5 p-0 bg-danger-600 text-danger-100"
            startContent={<CloseIcon fontSize="12" />}
          />
        </div>
      )}
    </div>
  );
}

export default PrescriptionTemplate;
