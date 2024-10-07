import { Schema, model, Document } from "mongoose";

export interface IPatient extends Document {
  name: string;
  age: number | string;
  weight: number | string;
  address: string;
  phone: string;
  prescription: Schema.Types.ObjectId[];
  userId: Schema.Types.ObjectId;
}

const patientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    age: { type: Schema.Types.Mixed, required: true },
    weight: { type: Schema.Types.Mixed },
    address: { type: String },
    phone: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true },
);

export default model<IPatient>("Patient", patientSchema);
