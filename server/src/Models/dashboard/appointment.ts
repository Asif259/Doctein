import { Schema, model, Document } from "mongoose";

interface IAppointment extends Document {
  patientId: string | Schema.Types.ObjectId;
  doctorId: string | Schema.Types.ObjectId;
  prescriptionId?: string | Schema.Types.ObjectId;
  date: Date | null;
  time: string;
  status: string;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    prescriptionId: { type: Schema.Types.ObjectId, ref: "Prescription" },
    date: { type: Date },
    status: {
      type: String,
      required: true,
      default: "upcoming",
      enum: ["upcoming", "completed", "cancelled"],
    },
  },
  { timestamps: true },
);

export default model<IAppointment>("Appointment", appointmentSchema);
