import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
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
import { useShallow } from "zustand/react/shallow";
import { CalendarIcon } from "lucide-react";
import { getMedication } from "@/api/dashboard/medicationAPI";
import { Key } from "@react-types/shared";

function AddForm({
  id,
  type,
  onClose,
}: {
  id?: number;
  type?: string;
  action?: string;
  onClose: () => void;
}) {
  const prescription = usePrescriptionStore((state) => state.prescription);

  switch (type) {
    case "medication":
      return (
        <MedicationForm
          id={id}
          data={prescription.medications}
          onClose={onClose}
        />
      );
    case "instruction":
      return (
        <InstructionForm
          id={id}
          data={prescription.instructions}
          onClose={onClose}
        />
      );
    case "complaint":
      return (
        <ComplaintForm
          id={id}
          data={prescription.complaints}
          onClose={onClose}
        />
      );
    case "history":
      return (
        <HistoryForm id={id} data={prescription.history} onClose={onClose} />
      );
    case "diagnosis":
      return (
        <DiagnosisForm
          id={id}
          data={prescription.diagnosisList}
          onClose={onClose}
        />
      );
    case "investigation":
      return (
        <InvestigationForm
          id={id}
          data={prescription.investigations}
          onClose={onClose}
        />
      );
    case "followUp":
      return (
        <FollowUpForm data={prescription.followUpDate} onClose={onClose} />
      );
    default:
      return <p>No form found</p>;
  }
}

export default AddForm;

function MedicationForm({
  id,
  data,
  onClose,
}: {
  id?: number;
  data: Medication[];
  onClose: () => void;
}) {
  const { addMedication, updateMedication } = usePrescriptionStore(
    useShallow((state) => ({
      addMedication: state.addMedication,
      updateMedication: state.updateMedication,
    })),
  );
  const [value, setValue] = React.useState<Key | null>(null);
  const [items, setItems] = React.useState<
    {
      _id: string;
      dosage_type: string;
      brand: string;
      generic: string;
      strength: string;
    }[]
  >([]);

  const formik = useFormik<Medication>({
    initialValues: {
      id: 0,
      medicationId: null,
      medication: "",
      duration: "",
      frequency: "",
      note: "",
    },
    onSubmit: (values) => {
      if (id) {
        updateMedication({
          ...values,
          id,
        });
      } else {
        addMedication({
          ...values,
          id: data.length + 1,
        });
      }
    },
  });

  useEffect(() => {
    if (id) {
      const item = data.find((item) => item.id === id);
      if (item) {
        formik.setValues(item);
      }
    }
  }, [data]);

  // search medication
  const searchMedication = async (search: string) => {
    if (!search) {
      setItems([]);
      return;
    }
    const response = await getMedication(search);
    if (response.success) {
      setItems(response.data);
    }
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <form className="space-y-4">
      <h2 className="text-lg font-semibold">Add Medication</h2>
      <div className="flex flex-row gap-2">
        <Autocomplete
          label="Medication Name"
          variant="bordered"
          items={items}
          placeholder="Search medication"
          selectedKey={value}
          onInputChange={(value) => searchMedication(value)}
          onSelectionChange={(key) => {
            formik.setFieldValue("medicationId", key);
            const item = items.find((item) => item._id === key);
            if (item) {
              formik.setFieldValue(
                "medication",
                `${item.dosage_type} ${item.brand}`,
              );
            }
            setValue(key);
          }}
        >
          {(item) => (
            <AutocompleteItem key={item._id as string}>
              {`${item.dosage_type} | ${item.brand} | ${item.generic} | ${item.strength}`}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <div className="flex flex-row gap-2">
        <Autocomplete
          label="Frequency"
          variant="bordered"
          items={[
            { label: "1+1+1" },
            { label: "1+0+1" },
            { label: "0+1+1" },
            { label: "1+1+0" },
            { label: "1+0+0" },
            { label: "0+1+0" },
            { label: "0+0+1" },
          ]}
          placeholder="Select frequency"
          selectedKey={formik.values.frequency}
          onSelectionChange={(key) => formik.setFieldValue("frequency", key)}
        >
          {(item) => (
            <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          label="Duration"
          variant="bordered"
          items={[
            {
              key: "1 week",
              label: "1 week",
            },
            {
              key: "2 weeks",
              label: "2 weeks",
            },
            {
              key: "3 weeks",
              label: "3 weeks",
            },
            {
              key: "1 month",
              label: "1 month",
            },
            {
              key: "2 months",
              label: "2 months",
            },
            {
              key: "3 months",
              label: "3 months",
            },
            {
              key: "6 months",
              label: "6 months",
            },
          ]}
          placeholder="Select duration"
          selectedKey={formik.values.duration}
          onSelectionChange={(key) => formik.setFieldValue("duration", key)}
        >
          {(item) => (
            <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <Input
        variant="bordered"
        label="Note"
        {...formik.getFieldProps("note")}
      />
      <FormButton onClose={onClose} handleSubmit={handleSubmit} />
    </form>
  );
}

function InstructionForm({
  id,
  data,
  onClose,
}: {
  id?: number;
  data: Instructions[];
  onClose: () => void;
}) {
  const { addInstruction, updateInstruction } = usePrescriptionStore(
    useShallow((state) => ({
      addInstruction: state.addInstruction,
      updateInstruction: state.updateInstruction,
    })),
  );

  const formik = useFormik<Instructions>({
    initialValues: {
      id: 0,
      instruction: "",
    },
    onSubmit: (values) => {
      if (id) {
        updateInstruction({
          ...values,
          id,
        });
      } else {
        addInstruction({
          ...values,
          id: data.length + 1,
        });
      }
    },
  });

  useEffect(() => {
    if (id) {
      const item = data.find((item) => item.id === id);
      if (item) {
        formik.setValues(item);
      }
    }
  }, [data]);

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

function ComplaintForm({
  id,
  data,
  onClose,
}: {
  id?: number;
  data: Complaint[];
  onClose: () => void;
}) {
  const { addComplaint, updateComplaint } = usePrescriptionStore(
    useShallow((state) => ({
      addComplaint: state.addComplaint,
      updateComplaint: state.updateComplaint,
    })),
  );

  const formik = useFormik<Complaint>({
    initialValues: {
      complaint: "",
      duration: "",
      severity: "",
      description: "",
      id: 0,
    },
    onSubmit: (values) => {
      if (id) {
        updateComplaint({
          ...values,
          id,
        });
      } else {
        addComplaint({
          ...values,
          id: data.length + 1,
        });
      }
    },
  });

  useEffect(() => {
    if (id) {
      const item = data.find((item) => item.id === id);
      if (item) {
        formik.setValues(item);
      }
    }
  }, [data]);

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

function HistoryForm({
  id,
  data,
  onClose,
}: {
  id?: number;
  data: History[];
  onClose: () => void;
}) {
  const { addHistory, updateHistory } = usePrescriptionStore(
    useShallow((state) => ({
      addHistory: state.addHistory,
      updateHistory: state.updateHistory,
    })),
  );

  const formik = useFormik<History>({
    initialValues: {
      diagnosis: "",
      description: "",
      duration: "",
      id: 0,
    },
    onSubmit: (values) => {
      if (id) {
        updateHistory({
          ...values,
          id,
        });
      } else {
        addHistory({
          ...values,
          id: data.length + 1,
        });
      }
    },
  });

  useEffect(() => {
    if (id) {
      const item = data.find((item) => item.id === id);
      if (item) {
        formik.setValues(item);
      }
    }
  }, [data]);

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

function DiagnosisForm({
  id,
  data,
  onClose,
}: {
  id?: number;
  data: Diagnosis[];
  onClose: () => void;
}) {
  const { addDiagnosis, updateDiagnosis } = usePrescriptionStore(
    useShallow((state) => ({
      addDiagnosis: state.addDiagnosis,
      updateDiagnosis: state.updateDiagnosis,
    })),
  );

  const formik = useFormik<Diagnosis>({
    initialValues: {
      name: "",
      description: "",
      date: "",
      id: 0,
    },
    onSubmit: (values) => {
      if (id) {
        updateDiagnosis({
          ...values,
          id,
        });
      } else {
        addDiagnosis({
          ...values,
          id: data.length + 1,
        });
      }
    },
  });

  useEffect(() => {
    if (id) {
      const item = data.find((item) => item.id === id);
      if (item) {
        formik.setValues(item);
      }
    }
  }, [data]);

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

function InvestigationForm({
  id,
  data,
  onClose,
}: {
  id?: number;
  data: Investigation[];
  onClose: () => void;
}) {
  const { addInvestigation, updateInvestigation } = usePrescriptionStore(
    useShallow((state) => ({
      addInvestigation: state.addInvestigation,
      updateInvestigation: state.updateInvestigation,
    })),
  );

  const formik = useFormik<Investigation>({
    initialValues: {
      name: "",
      description: "",
      date: "",
      id: 0,
    },
    onSubmit: (values) => {
      if (id) {
        updateInvestigation({
          ...values,
          id,
        });
      } else {
        addInvestigation({
          ...values,
          id: data.length + 1,
        });
      }
    },
  });

  useEffect(() => {
    if (id) {
      const item = data.find((item) => item.id === id);
      if (item) {
        formik.setValues(item);
      }
    }
  }, []);

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

function FollowUpForm({
  data,
  onClose,
}: {
  data: string;
  onClose: () => void;
}) {
  const setFollowUpDate = usePrescriptionStore(
    (state) => state.setFollowUpDate,
  );

  const formik = useFormik({
    initialValues: {
      followUpDate: data ? data : "",
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
      <Input
        endContent={<CalendarIcon className="place-items-baseline" size={18} />}
        label="Date"
        {...formik.getFieldProps("followUpDate")}
      />
      <FormButton onClose={onClose} handleSubmit={handleSubmit} />
    </form>
  );
}
