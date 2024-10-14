import React from "react";
import { useFormik } from "formik";
import { Input } from "@nextui-org/react";
import FormButton from "@/app/dashboard/prescription/[appointmentId]/form-button";
import { usePrescriptionStore } from "@/store/prescription-store";
import {
  Complaint,
  Diagnosis,
  History,
  Instructions,
  Investigation,
  Medication,
} from "@/types/prescription";

function AddForm({
  type,
  action,
  onClose,
}: {
  type: string;
  action: string;
  onClose: () => void;
}) {
  switch (type) {
    case "medication":
      return <MedicationForm onClose={onClose} />;
    case "instruction":
      return <InstructionForm onClose={onClose} />;
    case "complaint":
      return <ComplaintForm onClose={onClose} />;
    case "history":
      return <HistoryForm onClose={onClose} />;
    case "diagnosis":
      return <DiagnosisForm onClose={onClose} />;
    case "investigation":
      return <InvestigationForm onClose={onClose} />;
    case "followUp":
      return <FollowUpForm onClose={onClose} />;
    default:
      return <p>No form found</p>;
  }
}

export default AddForm;

function MedicationForm({ onClose }: { onClose: () => void }) {
  const addMedication = usePrescriptionStore((state) => state.addMedication);

  const formik = useFormik<Medication>({
    initialValues: {
      id: "1",
      type: "",
      name: "",
      dosage: "",
      duration: "",
      frequency: "",
      note: "",
    },
    onSubmit: (values) => {
      addMedication(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <form className="space-y-4">
      <h2 className="text-lg font-semibold">Add Medication</h2>
      <div className="flex flex-row gap-2">
        <Input
          className="w-1/3"
          label="Medication Type"
          {...formik.getFieldProps("type")}
        />
        <Input
          className="w-2/3"
          label="Medication Name"
          {...formik.getFieldProps("name")}
        />
      </div>
      <div className="flex flex-row gap-2">
        <Input label="Dosage" {...formik.getFieldProps("dosage")} />
        <Input label="Duration" {...formik.getFieldProps("duration")} />
        <Input label="Frequency" {...formik.getFieldProps("frequency")} />
      </div>
      <Input label="Note" {...formik.getFieldProps("note")} />
      <FormButton onClose={onClose} handleSubmit={handleSubmit} />
    </form>
  );
}

function InstructionForm({ onClose }: { onClose: () => void }) {
  const addInstruction = usePrescriptionStore((state) => state.addInstruction);

  const formik = useFormik<Instructions>({
    initialValues: {
      id: "",
      instruction: "",
    },
    onSubmit: (values) => {
      addInstruction(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <form className="space-y-4">
      <h2 className="text-lg font-semibold">Add Instruction</h2>
      <Input label="Instruction" {...formik.getFieldProps("instruction")} />
      <FormButton onClose={onClose} handleSubmit={handleSubmit} />
    </form>
  );
}

function ComplaintForm({ onClose }: { onClose: () => void }) {
  const addComplaint = usePrescriptionStore((state) => state.addComplaint);

  const formik = useFormik<Complaint>({
    initialValues: {
      complaint: "",
      duration: "",
      severity: "",
      description: "",
      id: "",
    },
    onSubmit: (values) => {
      addComplaint(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <form className="space-y-4">
      <h2 className="text-lg font-semibold">Add Complaint</h2>
      <Input label="Complaint" {...formik.getFieldProps("complaint")} />
      <div className="flex flex-row gap-2">
        <Input label="Duration" {...formik.getFieldProps("duration")} />
        <Input label="Severity" {...formik.getFieldProps("severity")} />
      </div>
      <Input label="Description" {...formik.getFieldProps("description")} />
      <FormButton onClose={onClose} handleSubmit={handleSubmit} />
    </form>
  );
}

function HistoryForm({ onClose }: { onClose: () => void }) {
  const addHistory = usePrescriptionStore((state) => state.addHistory);

  const formik = useFormik<History>({
    initialValues: {
      diagnosis: "",
      description: "",
      duration: "",
      id: "",
    },
    onSubmit: (values) => {
      addHistory(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <form className="space-y-4">
      <h2 className="text-lg font-semibold">Add History</h2>
      <Input label="Diagnosis" {...formik.getFieldProps("diagnosis")} />
      <Input label="Description" {...formik.getFieldProps("description")} />
      <Input label="Duration" {...formik.getFieldProps("duration")} />
      <FormButton onClose={onClose} handleSubmit={handleSubmit} />
    </form>
  );
}

function DiagnosisForm({ onClose }: { onClose: () => void }) {
  const addDiagnosis = usePrescriptionStore((state) => state.addDiagnosis);

  const formik = useFormik<Diagnosis>({
    initialValues: {
      name: "",
      description: "",
      date: "",
      id: "",
    },
    onSubmit: (values) => {
      addDiagnosis(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <form className="space-y-4">
      <h2 className="text-lg font-semibold">Add Diagnosis</h2>
      <Input label="Diagnosis" {...formik.getFieldProps("name")} />
      <Input label="Description" {...formik.getFieldProps("description")} />
      <Input label="Date" {...formik.getFieldProps("date")} />
      <FormButton onClose={onClose} handleSubmit={handleSubmit} />
    </form>
  );
}

function InvestigationForm({ onClose }: { onClose: () => void }) {
  const addInvestigation = usePrescriptionStore(
    (state) => state.addInvestigation,
  );

  const formik = useFormik<Investigation>({
    initialValues: {
      name: "",
      description: "",
      date: "",
      id: "",
    },
    onSubmit: (values) => {
      addInvestigation(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <form className="space-y-4">
      <h2 className="text-lg font-semibold">Add Investigation</h2>
      <Input label="Investigation" {...formik.getFieldProps("name")} />
      <Input label="Description" {...formik.getFieldProps("description")} />
      <Input label="Date" {...formik.getFieldProps("date")} />
      <FormButton onClose={onClose} handleSubmit={handleSubmit} />
    </form>
  );
}

function FollowUpForm({ onClose }: { onClose: () => void }) {
  const setFollowUpDate = usePrescriptionStore(
    (state) => state.setFollowUpDate,
  );

  const formik = useFormik({
    initialValues: {
      followUpDate: "",
    },
    onSubmit: (value) => {
      setFollowUpDate(value.followUpDate);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <form className="space-y-4">
      <h2 className="text-lg font-semibold">Add Follow Up</h2>
      <Input label="Date" {...formik.getFieldProps("followUpDate")} />
      <FormButton onClose={onClose} handleSubmit={handleSubmit} />
    </form>
  );
}
