import express from "express";

import * as prescriptionController from "../Controllers/dashboard/prescription";

const router = express.Router();

router.post("/prescription", prescriptionController.addPrescription);
// router.get("/prescription", prescriptionController.getPrescriptions);
router.get(
  "/prescription/:appointmentId",
  prescriptionController.getPrescriptionById,
);
router.put(
  "/prescription/:prescriptionId",
  prescriptionController.updatePrescription,
);
router.delete(
  "/prescription/:prescriptionId",
  prescriptionController.deletePrescription,
);

export default router;
