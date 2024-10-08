import express from "express";
import * as appointmentController from "../Controllers/dashboard/appointment";

const router = express.Router();

router.post("/appointment", appointmentController.saveAppointment);
router.get("/appointments", appointmentController.getAppointments);
router.put(
  "/appointment/:appointmentId",
  appointmentController.updateAppointment,
);
router.delete(
  "/appointment/:appointmentId",
  appointmentController.deleteAppointment,
);

export default router;
