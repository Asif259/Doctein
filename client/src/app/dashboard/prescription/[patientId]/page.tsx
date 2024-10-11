"use client";

import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrescriptionTemplate from "@/components/prescription/PrescriptionTemplate";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useDashboardStore } from "@/store/dashboardStore";

function Page({ params }: { params: { patientId: string } }) {
  const printableDiv = useRef<HTMLDivElement>(null);
  const printFn = useReactToPrint({
    contentRef: printableDiv,
    onAfterPrint: () => {
      setIsPrint(false);
    },
  });
  const [isPrint, setIsPrint] = useState<boolean>(false);
  const setEditable = useDashboardStore((state) => state.setEditable);

  const handlePrint = () => {
    setIsPrint(true);
    printFn();
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-5">
        <h1>Prescription App</h1>
        <div className="flex flex-row gap-3">
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
            <PrescriptionTemplate />
          ) : (
            <PrescriptionTemplate ref={printableDiv} isPrint={isPrint} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
