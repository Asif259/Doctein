import { ClipboardList, FileText, Stethoscope, Activity } from "lucide-react";
import { forwardRef, ReactNode } from "react";
import PrescriptionHeader from "@/components/prescription/PrescriptionHeader";

const PrescriptionTemplate = forwardRef<HTMLDivElement, { isPrint?: boolean }>(
  ({ isPrint = false }: { isPrint?: boolean }, ref) => {
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
                <ListItem description="some description">
                  Chest pain & excretion (for 5 days)
                </ListItem>
                <ListItem>No angina (for 10 days)</ListItem>
                <ListItem>Tiredness (for 1 month)</ListItem>
              </ul>
            </Section>

            <Section title="History" icon={<FileText className="w-4 h-4" />}>
              <ul className="list-disc pl-5 text-sm">
                <ListItem>CUD (for 4 days)</ListItem>
                <ListItem>HTN/CAD (for 10 days)</ListItem>
                <ListItem>Cholesterol (for 1 month)</ListItem>
              </ul>
            </Section>

            <Section
              title="Diagnosis"
              icon={<Stethoscope className="w-4 h-4" />}
            >
              <ul className="list-disc pl-5 text-sm">
                <ListItem>Post anginal</ListItem>
                <ListItem>Lumbar puncture</ListItem>
              </ul>
            </Section>

            <Section
              title="Investigation"
              icon={<Activity className="w-4 h-4" />}
            >
              <ul className="list-disc pl-5 text-sm">
                <ListItem>CBC</ListItem>
                <ListItem>Blood grouping</ListItem>
                <ListItem>RBC Count</ListItem>
              </ul>
            </Section>
          </div>

          <div className="w-2/3 pl-4 border-l border-gray-300">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Medicine (Rx)
            </h2>
            <div className="space-y-4">
              <Medication
                type="Tab."
                name="Pantonix 40 mg"
                dosage="1+0+1"
                duration="14 দিন"
                quantity="30 Pcs"
              />
              <Medication
                type="Inj."
                name="Oseotril 100 mg (Capsule)"
                dosage="1+0+1"
                duration="সপ্তাহে ৩ বার"
                quantity="14 Pcs"
              />
              <Medication
                type="Tab."
                name="Fenofex 40 mg"
                dosage="1+0+1 খাবার পর"
                duration="14 দিন"
                quantity="30 Pcs"
              />
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-1">Advice</h3>
              <p className="text-sm">Follow the prescription carefully.</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-1">Follow up</h3>
              <p className="text-sm">After 2 weeks</p>
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
  return (
    <div className="mb-4">
      <h2 className="text-md font-semibold mb-2 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      {children}
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
  return (
    <li>
      <p className="text-gray-900">{children}</p>
      <span className="text-[12px] text-gray-500">{description}</span>
    </li>
  );
}

function Medication({
  type,
  name,
  dosage,
  duration,
  quantity,
}: {
  type: string;
  name: string;
  dosage: string;
  duration: string;
  quantity: string;
}) {
  return (
    <div className="text-sm">
      <p className="font-semibold">
        {type} {name} ---- {quantity}
      </p>
      <p>
        {dosage} ---- {duration}
      </p>
    </div>
  );
}

export default PrescriptionTemplate;
