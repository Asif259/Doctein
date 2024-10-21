import { Schema, model, Document, ObjectId } from "mongoose";

export interface IMedication extends Document {
  id: number;
  medicationId: string;
  dosage: string;
  duration: string;
  frequency: string;
  note: string;
}

export interface IInstructions extends Document {
  id: number;
  instruction: string;
}

export interface IComplaint extends Document {
  id: number;
  complaint: string;
  duration: string;
  severity: string;
  description: string;
}

export interface IHistory extends Document {
  id: number;
  diagnosis: string;
  description?: string;
  duration?: string;
}

export interface IDiagnosis extends Document {
  id: number;
  name: string;
  description?: string;
  date?: string;
}

export interface IInvestigation extends Document {
  id: number;
  name: string;
  description?: string;
  date?: string;
}

export interface IPrescription extends Document {
  snapshot?: string;
  appointmentId: ObjectId;
  medications?: IMedication[] | [];
  instructions?: IInstructions[] | [];
  complaints?: IComplaint[] | [];
  history?: IHistory[] | [];
  diagnosisList?: IDiagnosis[] | [];
  investigations?: IInvestigation[] | [];
  followUpDate?: string;
}

const prescriptionSchema = new Schema<IPrescription>(
  {
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      unique: true,
      required: true,
    },
    snapshot: String,
    medications: [
      {
        id: Number,
        medicationId: { type: Schema.Types.ObjectId, ref: "Medication" },
        dosage: String,
        duration: String,
        frequency: String,
        note: String,
      },
    ],
    instructions: [{ id: Number, instruction: String }],
    complaints: [
      {
        id: Number,
        complaint: String,
        duration: String,
        severity: String,
        description: String,
      },
    ],
    history: [
      { id: Number, diagnosis: String, description: String, duration: String },
    ],
    diagnosisList: [
      { id: Number, name: String, description: String, date: String },
    ],
    investigations: [
      { id: Number, name: String, description: String, date: String },
    ],
    followUpDate: String,
  },
  { timestamps: true },
);

export default model<IPrescription>("Prescription", prescriptionSchema);
