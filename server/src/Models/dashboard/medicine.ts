import { Document, Schema, model } from "mongoose";

export interface IMedication extends Document {
  dosage_type: string;
  brand: string;
  generic: string;
  strength: string;
  manufacturer: string;
  retail_price?: number;
}

const medicationSchema = new Schema<IMedication>(
  {
    dosage_type: { type: String, required: true },
    brand: { type: String, required: true },
    generic: { type: String, required: true },
    strength: { type: String, required: true },
    manufacturer: { type: String, required: true },
    retail_price: { type: Number },
  },
  { timestamps: true },
);

export default model<IMedication>("Medication", medicationSchema);
