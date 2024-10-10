import Image from "next/image";
import { ClipboardList, FileText, Stethoscope, Activity } from "lucide-react";

export default function PrescriptionTemplate() {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-8 bg-white shadow-lg print:shadow-none">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-green-600">Dr Rashid Khan</h1>
          <p className="text-sm text-gray-600">MBBS, FCPS, PGT (Diploma)</p>
          <p className="text-sm font-semibold text-green-600">
            Assistant professor, Medicine
          </p>
          <p className="text-sm text-gray-600">
            Popular diagnostic center and hospital, Mirpur 10
          </p>
          <p className="text-sm text-gray-600">Email: doctor@example.com</p>
          <p className="text-sm text-gray-600">
            Cell: +01293347324, +01293347324,
          </p>
          <p className="text-sm text-gray-600">BMDC: D-4874</p>
        </div>
        <Image
          src="/placeholder.svg"
          alt="Hospital Logo"
          width={80}
          height={80}
          className="bg-green-600"
        />
      </div>

      <div className="border-t border-b border-gray-300 py-2 mb-4">
        <p className="text-sm">
          <span className="font-semibold">Patient:</span> Abdus Sattar Rahim
          <span className="ml-4 font-semibold">Age:</span> 28 years
          <span className="ml-4 font-semibold">Weight:</span> 53kg
          <span className="ml-4 font-semibold">Date:</span> 13 September, 2022
          <span className="ml-4 font-semibold">Time:</span> 10:20 am
        </p>
      </div>

      <div className="flex">
        <div className="w-1/3 pr-4">
          <Section
            title="Chief Complaints"
            icon={<ClipboardList className="w-4 h-4" />}
          >
            <ul className="list-disc pl-5 text-sm">
              <li>Chest pain & excretion (for 5 days)</li>
              <li>No angina (for 10 days)</li>
              <li>Tiredness (for 1 month)</li>
            </ul>
          </Section>

          <Section title="History" icon={<FileText className="w-4 h-4" />}>
            <ul className="list-disc pl-5 text-sm">
              <li>CUD (for 4 days)</li>
              <li>HTN/CAD (for 10 days)</li>
              <li>Cholesterol (for 1 month)</li>
            </ul>
          </Section>

          <Section title="Diagnosis" icon={<Stethoscope className="w-4 h-4" />}>
            <ul className="list-disc pl-5 text-sm">
              <li>Post anginal</li>
              <li>Lumbar puncture</li>
            </ul>
          </Section>

          <Section
            title="Investigation"
            icon={<Activity className="w-4 h-4" />}
          >
            <ul className="list-disc pl-5 text-sm">
              <li>CBC</li>
              <li>Blood grouping</li>
              <li>RBC Count</li>
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
              name="Tab. Pantonix 40 mg"
              dosage="1+0+1"
              duration="14 দিন"
              quantity="30 Pcs"
            />
            <Medication
              name="Inj. Oseotril 100 mg (Capsule)"
              dosage="1+0+1"
              duration="সপ্তাহে ৩ বার"
              quantity="14 Pcs"
            />
            <Medication
              name="Tab. Fenofex 40 mg"
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
}

function Section({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      {children}
    </div>
  );
}

function Medication({
  name,
  dosage,
  duration,
  quantity,
}: {
  name: string;
  dosage: string;
  duration: string;
  quantity: string;
}) {
  return (
    <div className="text-sm">
      <p className="font-semibold">
        {name} ---- {quantity}
      </p>
      <p>
        {dosage} ---- {duration}
      </p>
    </div>
  );
}
