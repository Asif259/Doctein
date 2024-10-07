import { Schema, model, Document } from "mongoose";

type Medicine = {
  name: string;
  dosage: string;
  duration: string;
  instruction?: string;
};

interface IPrescription extends Document {
  snapshot: string[];
  prescription: Medicine[];
  date: Date;
}

const medicineSchema = new Schema<Medicine>({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  duration: { type: String, required: true },
  instruction: { type: String },
});

const prescriptionSchema = new Schema<IPrescription>(
  {
    snapshot: [String],
    prescription: [medicineSchema],
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default model<IPrescription>("Prescription", prescriptionSchema);
