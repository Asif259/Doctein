import React from "react";
import PrescriptionTemplate from "@/components/prescription/PrescriptionTemplate";

function Page({ params }: { params: { patientId: string } }) {
  // TODO: Implement the prescription [patientId]
  return (
    <div>
      <h1>Prescription App</h1>
      <PrescriptionTemplate />
    </div>
  );
}

export default Page;
