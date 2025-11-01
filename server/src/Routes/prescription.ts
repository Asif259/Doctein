import express from "express";

import * as prescriptionController from "../Controllers/dashboard/prescription";
import * as medicationController from "../Controllers/dashboard/medicine";
import upload from "../Middlewares/multerConfig";
import { multerErrorHandler } from "../Middlewares/multerErrorHandler";

const router = express.Router();

router.post("/prescription", prescriptionController.addPrescription);
// router.get("/prescriptions", prescriptionController.getPrescriptions);
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
router.post(
  "/prescription/upload/:appointmentId",
  upload.single("file"),
  multerErrorHandler,
  prescriptionController.uploadPrescription,
);

// Medication
router.post("/medication", medicationController.addMedication);
router.get("/medication/search", medicationController.searchMedication);
router.get("/medication/:id", medicationController.getMedicationById);

export default router;
