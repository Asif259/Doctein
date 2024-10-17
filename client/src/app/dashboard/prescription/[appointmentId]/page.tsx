"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrescriptionTemplate from "@/components/prescription/prescription-template";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
} from "@nextui-org/react";
import { getAppointmentById } from "@/api/dashboard/appointmentAPI";
import { useRouter } from "next/navigation";
import { usePrescriptionStore } from "@/store/prescription-store";
import { savePrescription } from "@/api/dashboard/prescriptionAPI";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";

function Page({ params }: { params: { appointmentId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const printableDiv = useRef<HTMLDivElement>(null);
  const printFn = useReactToPrint({
    contentRef: printableDiv,
    onAfterPrint: () => {
      setIsPrint(false);
    },
  });
  const [isPrint, setIsPrint] = useState<boolean>(false);
  const {
    prescription,
    resetPrescription,
    setPrescriptionHeader,
    setEditable,
  } = usePrescriptionStore(
    useShallow((state) => ({
      prescription: state.prescription,
      resetPrescription: state.resetPrescription,
      setPrescriptionHeader: state.setPrescriptionHeader,
      setEditable: state.setEditable,
    })),
  );

  // handle appointment ID from params
  useEffect(() => {
    resetPrescription();
    (async () => {
      const appointmentId = params.appointmentId;
      const res = await getAppointmentById(appointmentId);
      if (res?.success) {
        setPrescriptionHeader(res.data);
        setLoading(false);
      } else {
        router.push("/prescription/404");
      }
    })();
  }, []);

  // handle print prescription
  const handlePrint = () => {
    setIsPrint(true);
    printFn();
  };

  // handle save prescription to database
  const handleSave = async () => {
    console.log("Prescription:", prescription);
    if (prescription.appointmentId === "") {
      return;
    }
    const res = await savePrescription(prescription);
    if (res?.success) {
      toast.success("Prescription saved successfully");
    }
  };

  if (loading) {
    return (
      <div className="flex h-dvh w-full justify-center items-center gap-4">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-5">
        <h1>Prescription App</h1>
        <div className="flex flex-row gap-3">
          <Button onClick={() => handleSave()}>Save</Button>
          <Button onClick={() => setEditable(false)}>Preview</Button>
          <Button onClick={() => setEditable(true)}>Edit</Button>
          <Button onClick={handlePrint}>Print</Button>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <div className="w-1/4">
          {/*<PrescriptionTabs />*/}
          <Card>
            <CardHeader className="font-bold">History</CardHeader>
            <Divider />
            <CardBody>
              <p>History of patient</p>
              <ul className="list-disc ml-5 text-sm">
                <li className="list-item">Appointment 1</li>
                <li className="list-item">Appointment 2</li>
                <li className="list-item">Appointment 3</li>
                <li className="list-item">Appointment 4</li>
              </ul>
            </CardBody>
          </Card>
        </div>
        <div className="w-3/4">
          {isPrint ? (
            <PrescriptionTemplate appointmentId={params.appointmentId} />
          ) : (
            <PrescriptionTemplate
              appointmentId={params.appointmentId}
              ref={printableDiv}
              isPrint={isPrint}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
