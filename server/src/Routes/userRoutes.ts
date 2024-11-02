import express from "express";
import * as patientController from "../Controllers/dashboard/patient";
import * as doctorController from "../Controllers/dashboard/doctor"
import * as staffController from "../Controllers/dashboard/staff"
import authenticate from "../Middlewares/authenticate";
import { doctorValidationRules } from "../Validators/doctorValidator";
import { validate } from "../Middlewares/validate";

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
router.post('/doctors', authenticate, doctorValidationRules, validate, doctorController.saveDoctor);
router.get('/doctors', authenticate, doctorController.getDoctor);
router.put('/doctors', authenticate, doctorValidationRules, validate, doctorController.updateDoctor);

//staffs
router.post('/staffs', authenticate, staffController.saveStaff);
router.get("/staffs", authenticate, staffController.getStaffs);
router.put("/staffs/:staffId", authenticate, staffController.updateStaff);
router.delete("/staffs/:staffId", authenticate, staffController.deleteStaff);


export default router;
