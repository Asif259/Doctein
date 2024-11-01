import express from "express";
import * as appointmentController from "../Controllers/dashboard/appointment";

const router = express.Router();

router.post("/appointments", appointmentController.saveAppointment);
router.get("/appointments", appointmentController.getAppointments);
router.get(
  "/appointments/patient/:patientId",
  appointmentController.getAppointmentByPatientId,
);
router.get(
  "/appointments/:appointmentId",
  appointmentController.getAppointmentById,
);
router.put(
  "/appointments/:appointmentId",
  appointmentController.updateAppointment,
);
router.delete(
  "/appointments/:appointmentId",
  appointmentController.deleteAppointment,
);
router.put(
  "/appointments/status/:appointmentId",
  appointmentController.updateAppointmentStatus,
);

export default router;
