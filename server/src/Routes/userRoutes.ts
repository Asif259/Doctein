import express from "express";
import * as patientController from "../Controllers/dashboard/patient";
import * as doctorController from "../Controllers/dashboard/doctor"
import authenticate from "../Middlewares/authenticate";

const router = express.Router();

router.post("/patients", authenticate, patientController.savePatient);
router.get("/patients", authenticate, patientController.getPatients);
router.get("/patients/:patientId", authenticate, patientController.getPatient);
router.put(
  "/patients/:patientId",
  authenticate,
  patientController.updatePatient,
);
router.delete(
  "/patients/:patientId",
  authenticate,
  patientController.deletePatient,
);

//doctor
router.post('/doctors', authenticate, doctorController.saveDoctor);
router.get('/doctors', authenticate, doctorController.getDoctor);
router.put('/doctors', authenticate, doctorController.updateDoctor);


export default router;
