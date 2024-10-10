"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrescriptionTemplate from "@/components/prescription/PrescriptionTemplate";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import PrescriptionTabs from "@/app/dashboard/prescription/[patientId]/Tabs";

function Page({ params }: { params: { patientId: string } }) {
  const printableDiv = useRef<HTMLDivElement>(null);
  const printFn = useReactToPrint({
    contentRef: printableDiv,
    onAfterPrint: () => {
      setIsPrint(false);
    },
  });
  const [isPrint, setIsPrint] = useState<boolean>(false);

  const handlePrint = () => {
    setIsPrint(true);
    printFn();
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-5">
        <h1>Prescription App</h1>
        <Button onClick={handlePrint}>Print</Button>
      </div>
      <div className="flex flex-row gap-3">
        <div className="w-1/2">
          <PrescriptionTabs />
        </div>
        <div className="w-1/2">
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
