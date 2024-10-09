import express from "express";
import * as appointmentController from "../Controllers/dashboard/appointment";

const router = express.Router();

router.post("/appointments", appointmentController.saveAppointment);
router.get("/appointments", appointmentController.getAppointments);
router.put(
  "/appointments/:appointmentId",
  appointmentController.updateAppointment,
);
router.delete(
  "/appointments/:appointmentId",
  appointmentController.deleteAppointment,
);

export default router;
