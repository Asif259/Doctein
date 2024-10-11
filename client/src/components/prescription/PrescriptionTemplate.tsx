import {
  ClipboardList,
  FileText,
  Stethoscope,
  Activity,
  EditIcon,
  PlusIcon,
} from "lucide-react";
import { forwardRef, ReactNode, useEffect, useState } from "react";
import PrescriptionHeader from "@/components/prescription/PrescriptionHeader";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { CloseIcon } from "@nextui-org/shared-icons";
import { useDashboardStore } from "@/store/dashboardStore";

const PrescriptionTemplate = forwardRef<HTMLDivElement, { isPrint?: boolean }>(
  ({ isPrint = false }: { isPrint?: boolean }, ref) => {
    const [complaints, setComplaints] = useState<
      {
        complaint: string;
        duration: string;
        severity: string;
        description: string;
      }[]
    >([]);
    const [history, setHistory] = useState<
      {
        duration: string;
        description: string;
        diagnosis: string;
      }[]
    >([]);
    const [diagnosis, setDiagnosis] = useState<
      {
        name: string;
        description: string;
        date: string;
      }[]
    >([]);
    const [investigation, setInvestigation] = useState<
      {
        name: string;
        description: string;
        date: string;
      }[]
    >([]);
    const [medicines, setMedicines] = useState<
      {
        type: string;
        name: string;
        dosage: string;
        duration: string;
        frequency: string;
      }[]
    >([]);
    const [instructions, setInstructions] = useState<
      {
        id: number;
        instruction: string;
      }[]
    >([]);
    const [followUp, setFollowUp] = useState<{
      date: string;
      time: string;
    } | null>(null);

    const isEditable = useDashboardStore((state) => state.isEditable);

    useEffect(() => {
      (async () => {
        const res = await axios.get("/prescription.json");
        if (res.data) {
          setComplaints(res.data.complaints);
          setHistory(res.data.history);
          setDiagnosis(res.data.diagnosis);
          setInvestigation(res.data.investigations);
          setMedicines(res.data.medicines);
          setInstructions(res.data.instructions);
          setFollowUp(res.data.followUp);
        }
      })();
    }, []);
    return (
      <div
        ref={ref}
        id="print-precription"
        className={`${isPrint ? "w-[210mm] h-[297mm]" : "w-full h-full"} mx-auto p-8 rounded-lg bg-white shadow-lg print:shadow-none`}
      >
        <PrescriptionHeader />
        <div className="flex">
          <div className="w-1/3 pr-4">
            <Section
              title="Chief Complaints"
              icon={<ClipboardList className="w-4 h-4" />}
            >
              <ul className="list-disc pl-5 text-sm">
                {complaints.map((complaint, index) => (
                  <ListItem description={complaint.description} key={index}>
                    {complaint.complaint} ({complaint.duration}) -{" "}
                    {complaint.severity}
                  </ListItem>
                ))}
              </ul>
            </Section>

            <Section title="History" icon={<FileText className="w-4 h-4" />}>
              <ul className="list-disc pl-5 text-sm">
                {history.map((item, index) => (
                  <ListItem description={item.description} key={index}>
                    {item.description} (for {item.duration})
                  </ListItem>
                ))}
              </ul>
            </Section>

            <Section
              title="Diagnosis"
              icon={<Stethoscope className="w-4 h-4" />}
            >
              <ul className="list-disc pl-5 text-sm">
                {diagnosis.map((item, index) => (
                  <ListItem key={index}>
                    {item.name} -{" "}
                    <span className="text-[11px] text-gray-600">
                      ({item.date})
                    </span>
                  </ListItem>
                ))}
              </ul>
            </Section>

            <Section
              title="Investigation"
              icon={<Activity className="w-4 h-4" />}
            >
              <ul className="list-disc pl-5 text-sm">
                {investigation.map((item, index) => (
                  <ListItem description={item.description} key={index}>
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
                <FileText className="w-5 h-5 mr-2" />
                Medicine (R<sub>x</sub>)
              </h2>
              {isEditable && (
                <Button
                  className="min-w-6 h-6 p-0 text-white bg-success"
                  startContent={<PlusIcon size="20" className="font-black" />}
                />
              )}
            </div>
            <div className="space-y-4">
              {medicines.map((medicine, index) => (
                <Medication
                  key={index}
                  type={medicine.type}
                  name={medicine.name}
                  dosage={medicine.dosage}
                  duration={medicine.duration}
                  frequency={medicine.frequency}
                />
              ))}
            </div>

            <div className="mt-6">
              <Header title="Instructions" />
              {
                <ol className="pl-5 list-decimal text-sm">
                  {instructions.map((item, index) => (
                    <ListItem key={index}>{item.instruction}</ListItem>
                  ))}
                </ol>
              }
            </div>

            <div className="mt-4">
              <Header title="Follow Up" />
              <p className="text-sm">
                <span className="underline">Next Visit:</span> {followUp?.date}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export function Section({
  title,
  children,
  icon,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  const isEditable = useDashboardStore((state) => state.isEditable);

  return (
    <div className="mb-4">
      <h2 className="text-md font-semibold mb-2 flex items-center">
        {icon}
        <div className="flex flex-row gap-3 items-center">
          <span className="ml-2">{title}</span>
          {isEditable && (
            <Button
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

function Header({ title }: { title: string }) {
  const isEditable = useDashboardStore((state) => state.isEditable);

  return (
    <div className="flex flex-row gap-3">
      <h3 className="font-semibold mb-1">{title}</h3>
      {isEditable && (
        <Button
          className="min-w-6 h-6 p-0 text-white bg-success"
          startContent={<PlusIcon size="20" className="font-black" />}
        />
      )}
    </div>
  );
}

function ListItem({
  children,
  description,
}: {
  children: ReactNode;
  description?: string;
}) {
  const isEditable = useDashboardStore((state) => state.isEditable);
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
              className="min-w-5 h-5 p-0 bg-warning-600 text-warning-100"
              startContent={<EditIcon size="12" />}
            />
            <Button
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
            className="min-w-5 h-5 p-0 bg-warning-600 text-warning-100"
            startContent={<EditIcon size="12" />}
          />
          <Button
            className="min-w-5 h-5 p-0 bg-danger-600 text-danger-100"
            startContent={<CloseIcon fontSize="12" />}
          />
        </div>
      )}
    </div>
  );
}

export default PrescriptionTemplate;
