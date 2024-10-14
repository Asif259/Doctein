import { Schema, model, Document, ObjectId } from "mongoose";

export interface IMedication extends Document {
  id: string;
  type: string;
  name: string;
  dosage: string;
  duration: string;
  frequency: string;
  note: string;
}

export interface IInstructions extends Document {
  id: string;
  instruction: string;
}

export interface IComplaint extends Document {
  id: string;
  complaint: string;
  duration: string;
  severity: string;
  description: string;
}

export interface IHistory extends Document {
  id: string;
  diagnosis: string;
  description?: string;
  duration?: string;
}

export interface IDiagnosis extends Document {
  id: string;
  name: string;
  description?: string;
  date?: string;
}

export interface IInvestigation extends Document {
  id: string;
  name: string;
  description?: string;
  date?: string;
}

export interface IPrescription extends Document {
  snapshot?: string;
  appointmentId: ObjectId;
  medications?: IMedication[];
  instructions?: IInstructions[];
  complaints?: IComplaint[];
  history?: IHistory[];
  diagnosisList?: IDiagnosis[];
  investigations?: IInvestigation[];
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
        type: { type: String },
        name: { type: String },
        dosage: { type: String },
        duration: { type: String },
        frequency: { type: String },
        note: { type: String },
      },
    ],
    instructions: [{ instruction: String }],
    complaints: [
      {
        complaint: String,
        duration: String,
        severity: String,
        description: String,
      },
    ],
    history: [
      {
        diagnosis: String,
        description: String,
        duration: String,
      },
    ],
    diagnosisList: [{ name: String, description: String, date: String }],
    investigations: [{ name: String, description: String, date: String }],
    followUpDate: String,
  },
  { timestamps: true },
);

export default model<IPrescription>("Prescription", prescriptionSchema);
