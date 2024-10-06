import { Schema, model, Document } from "mongoose";

interface IPatient extends Document {
  name: string;
  age: number | string;
  address: string;
  phone: string;
  prescription: Schema.Types.ObjectId[];
  medicalHistory: Schema.Types.ObjectId[];
  userId: Schema.Types.ObjectId;
}

const patientSchema = new Schema<IPatient>({
  name: { type: String, required: true },
  age: { type: Schema.Types.Mixed, required: true },
  address: { type: String },
  phone: { type: String, required: true },
  prescription: [{ type: Schema.Types.ObjectId, ref: "Prescription" }],
  medicalHistory: [{ type: Schema.Types.ObjectId, ref: "MedicalHistory" }],
  userId: { type: Schema.Types.ObjectId, required: true, unique: true },
});

export default model<IPatient>("Patient", patientSchema);
